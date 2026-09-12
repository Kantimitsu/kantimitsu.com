using System.Windows;
using System.IO;
using Kantimitsu.Collector.Models;
using Kantimitsu.Collector.Services;
using Microsoft.Win32;

namespace Kantimitsu.Collector;

public partial class MainWindow : Window
{
    private readonly CollectorService _collector = new();
    private CancellationTokenSource? _cancellation;

    public MainWindow() => InitializeComponent();

    private async void ScanButton_Click(object sender, RoutedEventArgs e)
    {
        _cancellation = new CancellationTokenSource();
        ScanButton.IsEnabled = false;
        CancelButton.IsEnabled = true;
        SaveButton.IsEnabled = false;
        PreviewText.Text = string.Empty;
        var consent = new Consent(
            HardwareCheck.IsChecked == true, DisplaysCheck.IsChecked == true, AudioCheck.IsChecked == true,
            SoftwareCheck.IsChecked == true, GameCheck.IsChecked == true, BenchmarkCheck.IsChecked == true, NetworkCheck.IsChecked == true);
        try
        {
            var report = await _collector.CollectAsync(consent, GameText.Text, new Progress<string>(text => StatusText.Text = text), _cancellation.Token);
            PreviewText.Text = CollectorService.Serialize(report);
            StatusText.Text = "Report generated locally. Inspect or edit it, then save only if satisfied.";
            SaveButton.IsEnabled = true;
        }
        catch (OperationCanceledException) { StatusText.Text = "Cancelled. No report was saved or uploaded."; }
        catch (Exception ex) { StatusText.Text = $"Collection stopped: {ex.Message}"; }
        finally { ScanButton.IsEnabled = true; CancelButton.IsEnabled = false; _cancellation.Dispose(); _cancellation = null; }
    }

    private void CancelButton_Click(object sender, RoutedEventArgs e) => _cancellation?.Cancel();

    private void SaveButton_Click(object sender, RoutedEventArgs e)
    {
        if (!CollectorService.IsValidEditableJson(PreviewText.Text, out var error)) { StatusText.Text = error; return; }
        var dialog = new Microsoft.Win32.SaveFileDialog { Title = "Save reviewed diagnostic report", FileName = $"kantimitsu-report-{DateTime.Now:yyyyMMdd-HHmm}.json", DefaultExt = ".json", Filter = "JSON report (*.json)|*.json" };
        if (dialog.ShowDialog(this) != true) return;
        File.WriteAllText(dialog.FileName, PreviewText.Text, new System.Text.UTF8Encoding(false));
        StatusText.Text = "Saved locally. Nothing was uploaded. Attach it on the contact page only if you choose.";
    }
}
