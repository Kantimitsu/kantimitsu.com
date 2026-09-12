using System.Diagnostics;
using System.Management;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text.Json;
using Kantimitsu.Collector.Models;
using Microsoft.Win32;

namespace Kantimitsu.Collector.Services;

public sealed class CollectorService
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };

    public async Task<DiagnosticReport> CollectAsync(Consent consent, IProgress<string> progress, CancellationToken cancellationToken)
    {
        var warnings = new List<string>();
        progress.Report("Reading Windows version. No usernames, paths, keys, serials or files are collected.");
        var system = new SystemSnapshot
        {
            Os = RuntimeInformation.OSDescription.Trim(),
            Architecture = RuntimeInformation.OSArchitecture.ToString(),
            Cpu = consent.Hardware ? ReadCpu(warnings) : null,
            MemoryBytes = consent.Hardware ? ReadTotalMemory(warnings) : null,
            Gpus = consent.Hardware ? ReadDevices("SELECT Name, AdapterRAM FROM Win32_VideoController", true, warnings) : null,
            Displays = consent.Displays ? ReadDisplays() : null,
            AudioDevices = consent.Audio ? ReadDevices("SELECT Name FROM Win32_SoundDevice", false, warnings) : null
        };

        if (!consent.Hardware) warnings.Add("Hardware collection was not authorised by the user.");
        if (!consent.Displays) warnings.Add("Display collection was not authorised by the user.");
        if (!consent.Audio) warnings.Add("Audio-device collection was not authorised by the user.");

        var software = consent.StreamingSoftware ? ReadKnownSoftware(warnings) : null;
        if (!consent.StreamingSoftware) warnings.Add("Streaming-software collection was not authorised by the user.");

        BenchmarkResult? benchmark = null;
        if (consent.Benchmark)
        {
            progress.Report("Running a 30-second aggregate CPU and memory sample. Cancel remains available.");
            benchmark = await RunBenchmarkAsync(30, progress, cancellationToken);
        }

        NetworkTestResult? network = null;
        if (consent.NetworkTest)
        {
            progress.Report("Testing kantimitsu.com only. Sending 256 KiB of generated zero bytes.");
            try { network = await RunNetworkTestAsync(cancellationToken); }
            catch (Exception ex) { warnings.Add($"Network test failed: {SafeMessage(ex.Message)}"); }
        }

        return new DiagnosticReport { Consent = consent, System = system, StreamingSoftware = software, Benchmark = benchmark, NetworkTest = network, Warnings = warnings };
    }

    public static string Serialize(DiagnosticReport report) => JsonSerializer.Serialize(report, JsonOptions);
    public static bool IsValidEditableJson(string value, out string error)
    {
        try { JsonDocument.Parse(value); error = string.Empty; return true; }
        catch (JsonException ex) { error = $"JSON cannot be saved: {SafeMessage(ex.Message)}"; return false; }
    }

    private static CpuInfo? ReadCpu(List<string> warnings)
    {
        try
        {
            using var searcher = new ManagementObjectSearcher("SELECT Name, NumberOfLogicalProcessors FROM Win32_Processor");
            using var items = searcher.Get();
            var first = items.Cast<ManagementObject>().FirstOrDefault();
            return first is null ? null : new CpuInfo(Convert.ToString(first["Name"])?.Trim() ?? "Unknown CPU", Convert.ToInt32(first["NumberOfLogicalProcessors"]));
        }
        catch { warnings.Add("CPU details were unavailable."); return null; }
    }

    private static long? ReadTotalMemory(List<string> warnings)
    {
        try
        {
            var status = new MemoryStatus { Length = (uint)Marshal.SizeOf<MemoryStatus>() };
            return GlobalMemoryStatusEx(ref status) ? checked((long)status.TotalPhysical) : null;
        }
        catch { warnings.Add("Installed memory total was unavailable."); return null; }
    }

    private static List<NamedDevice> ReadDevices(string query, bool includeMemory, List<string> warnings)
    {
        try
        {
            using var searcher = new ManagementObjectSearcher(query);
            using var results = searcher.Get();
            return results.Cast<ManagementObject>().Select(item => new NamedDevice(
                Convert.ToString(item["Name"])?.Trim() ?? "Unknown device",
                includeMemory && item["AdapterRAM"] is not null ? Convert.ToInt64(item["AdapterRAM"]) : null)).Take(64).ToList();
        }
        catch { warnings.Add("One device category was unavailable through Windows Management Instrumentation."); return []; }
    }

    private static List<DisplayInfo> ReadDisplays() => System.Windows.Forms.Screen.AllScreens
        .Select(screen => new DisplayInfo(screen.Bounds.Width, screen.Bounds.Height, screen.Primary)).Take(16).ToList();

    private static List<SoftwareItem> ReadKnownSoftware(List<string> warnings)
    {
        string[] wanted = ["OBS Studio", "TikTok LIVE Studio", "Streamer.bot", "TikFinity", "SteelSeries GG"];
        var found = new Dictionary<string, string?>(StringComparer.OrdinalIgnoreCase);
        try
        {
            foreach (var view in new[] { RegistryView.Registry64, RegistryView.Registry32 })
            using (var baseKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, view))
            using (var uninstall = baseKey.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"))
            {
                if (uninstall is null) continue;
                foreach (var keyName in uninstall.GetSubKeyNames())
                using (var item = uninstall.OpenSubKey(keyName))
                {
                    var name = Convert.ToString(item?.GetValue("DisplayName"));
                    var match = wanted.FirstOrDefault(candidate => name?.Contains(candidate, StringComparison.OrdinalIgnoreCase) == true);
                    if (match is not null) found[match] = Convert.ToString(item?.GetValue("DisplayVersion"));
                }
            }
        }
        catch { warnings.Add("Known streaming-software versions could not be read completely."); }
        return wanted.Select(name => new SoftwareItem(name, found.ContainsKey(name), found.GetValueOrDefault(name))).ToList();
    }

    private static async Task<BenchmarkResult> RunBenchmarkAsync(int durationSeconds, IProgress<string> progress, CancellationToken token)
    {
        var cpu = new List<double>();
        var memory = new List<double>();
        GetSystemTimes(out var idlePrevious, out var kernelPrevious, out var userPrevious);
        for (var second = 0; second < durationSeconds; second++)
        {
            await Task.Delay(1000, token);
            if (GetSystemTimes(out var idle, out var kernel, out var user))
            {
                var idleDelta = ToUInt64(idle) - ToUInt64(idlePrevious);
                var totalDelta = ToUInt64(kernel) - ToUInt64(kernelPrevious) + ToUInt64(user) - ToUInt64(userPrevious);
                if (totalDelta > 0) cpu.Add(Math.Round(100d * (totalDelta - idleDelta) / totalDelta, 2));
                idlePrevious = idle; kernelPrevious = kernel; userPrevious = user;
            }
            var status = new MemoryStatus { Length = (uint)Marshal.SizeOf<MemoryStatus>() };
            if (GlobalMemoryStatusEx(ref status)) memory.Add(status.MemoryLoad);
            progress.Report($"Benchmark sample {second + 1}/{durationSeconds}");
        }
        return new BenchmarkResult(durationSeconds, Math.Min(cpu.Count, memory.Count), Summarize(cpu), Summarize(memory));
    }

    private static async Task<NetworkTestResult> RunNetworkTestAsync(CancellationToken token)
    {
        using var client = new HttpClient { Timeout = TimeSpan.FromSeconds(20) };
        var timer = Stopwatch.StartNew();
        using var ping = await client.GetAsync("https://kantimitsu.com/api/network-test/ping", token);
        ping.EnsureSuccessStatusCode();
        var latency = timer.Elapsed.TotalMilliseconds;
        const int bytes = 256 * 1024;
        timer.Restart();
        using var upload = await client.PostAsync("https://kantimitsu.com/api/network-test/upload", new ByteArrayContent(new byte[bytes]), token);
        upload.EnsureSuccessStatusCode();
        return new NetworkTestResult("https://kantimitsu.com", Math.Round(latency, 2), bytes, Math.Round(timer.Elapsed.TotalMilliseconds, 2));
    }

    private static MetricSummary Summarize(List<double> values)
    {
        if (values.Count == 0) return new MetricSummary(0, 0, 0, 0);
        values.Sort();
        var p95 = values[Math.Clamp((int)Math.Ceiling(values.Count * .95) - 1, 0, values.Count - 1)];
        return new MetricSummary(values.First(), Math.Round(values.Average(), 2), values.Last(), p95);
    }

    private static string SafeMessage(string value)
    {
        var safe = value.Replace(Environment.UserName, "[user]", StringComparison.OrdinalIgnoreCase);
        return safe.Length > 280 ? safe[..280] : safe;
    }
    private static ulong ToUInt64(FileTime time) => ((ulong)time.High << 32) | time.Low;

    [StructLayout(LayoutKind.Sequential)] private struct FileTime { public uint Low; public uint High; }
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)] private struct MemoryStatus { public uint Length; public uint MemoryLoad; public ulong TotalPhysical; public ulong AvailablePhysical; public ulong TotalPageFile; public ulong AvailablePageFile; public ulong TotalVirtual; public ulong AvailableVirtual; public ulong AvailableExtendedVirtual; }
    [DllImport("kernel32.dll", SetLastError = true)] private static extern bool GetSystemTimes(out FileTime idle, out FileTime kernel, out FileTime user);
    [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)] private static extern bool GlobalMemoryStatusEx(ref MemoryStatus buffer);
}
