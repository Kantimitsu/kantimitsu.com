using System.IO;
using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Threading;

namespace Kantimitsu.Collector;

public partial class App : System.Windows.Application
{
    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        var window = new MainWindow();
        var captureIndex = Array.IndexOf(e.Args, "--capture-preview");
        if (captureIndex < 0 || captureIndex + 1 >= e.Args.Length)
        {
            window.Show();
            return;
        }

        var outputPath = Path.GetFullPath(e.Args[captureIndex + 1]);
        window.Show();
        window.Dispatcher.BeginInvoke(DispatcherPriority.ApplicationIdle, async () =>
        {
            await Task.Delay(500);
            window.UpdateLayout();
            var width = Math.Max(1, (int)Math.Ceiling(window.ActualWidth));
            var height = Math.Max(1, (int)Math.Ceiling(window.ActualHeight));
            var bitmap = new RenderTargetBitmap(width, height, 96, 96, PixelFormats.Pbgra32);
            bitmap.Render(window);
            var encoder = new PngBitmapEncoder();
            encoder.Frames.Add(BitmapFrame.Create(bitmap));
            Directory.CreateDirectory(Path.GetDirectoryName(outputPath)!);
            using var stream = File.Create(outputPath);
            encoder.Save(stream);
            window.Close();
            Shutdown();
        });
    }
}
