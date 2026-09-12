using System.Text.Json.Serialization;

namespace Kantimitsu.Collector.Models;

public sealed class DiagnosticReport
{
    [JsonPropertyName("schemaVersion")] public string SchemaVersion { get; init; } = "1.0.0";
    [JsonPropertyName("collectorVersion")] public string CollectorVersion { get; init; } = "0.1.0-beta";
    [JsonPropertyName("generatedAtUtc")] public DateTimeOffset GeneratedAtUtc { get; init; } = DateTimeOffset.UtcNow;
    [JsonPropertyName("consent")] public required Consent Consent { get; init; }
    [JsonPropertyName("system")] public required SystemSnapshot System { get; init; }
    [JsonPropertyName("streamingSoftware")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public List<SoftwareItem>? StreamingSoftware { get; init; }
    [JsonPropertyName("selectedGame")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public SelectedGame? SelectedGame { get; init; }
    [JsonPropertyName("benchmark")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public BenchmarkResult? Benchmark { get; init; }
    [JsonPropertyName("networkTest")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public NetworkTestResult? NetworkTest { get; init; }
    [JsonPropertyName("warnings")] public List<string> Warnings { get; init; } = [];
}

public sealed record Consent(
    [property: JsonPropertyName("hardware")] bool Hardware,
    [property: JsonPropertyName("displays")] bool Displays,
    [property: JsonPropertyName("audio")] bool Audio,
    [property: JsonPropertyName("streamingSoftware")] bool StreamingSoftware,
    [property: JsonPropertyName("activeGame")] bool ActiveGame,
    [property: JsonPropertyName("benchmark")] bool Benchmark,
    [property: JsonPropertyName("networkTest")] bool NetworkTest);

public sealed class SystemSnapshot
{
    [JsonPropertyName("os")] public required string Os { get; init; }
    [JsonPropertyName("architecture")] public required string Architecture { get; init; }
    [JsonPropertyName("cpu")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public CpuInfo? Cpu { get; init; }
    [JsonPropertyName("memoryBytes")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public long? MemoryBytes { get; init; }
    [JsonPropertyName("gpus")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public List<NamedDevice>? Gpus { get; init; }
    [JsonPropertyName("displays")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public List<DisplayInfo>? Displays { get; init; }
    [JsonPropertyName("audioDevices")][JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] public List<NamedDevice>? AudioDevices { get; init; }
}

public sealed record CpuInfo([property: JsonPropertyName("name")] string Name, [property: JsonPropertyName("logicalProcessors")] int LogicalProcessors);
public sealed record NamedDevice([property: JsonPropertyName("name")] string Name, [property: JsonPropertyName("memoryBytes")][property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] long? MemoryBytes = null);
public sealed record DisplayInfo([property: JsonPropertyName("width")] int Width, [property: JsonPropertyName("height")] int Height, [property: JsonPropertyName("primary")] bool Primary);
public sealed record SoftwareItem([property: JsonPropertyName("name")] string Name, [property: JsonPropertyName("detected")] bool Detected, [property: JsonPropertyName("version")][property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] string? Version = null);
public sealed record SelectedGame([property: JsonPropertyName("name")] string Name, [property: JsonPropertyName("source")] string Source = "user-selected");
public sealed record MetricSummary([property: JsonPropertyName("minimum")] double Minimum, [property: JsonPropertyName("mean")] double Mean, [property: JsonPropertyName("maximum")] double Maximum, [property: JsonPropertyName("p95")] double P95);
public sealed record BenchmarkResult([property: JsonPropertyName("durationSeconds")] int DurationSeconds, [property: JsonPropertyName("sampleCount")] int SampleCount, [property: JsonPropertyName("cpuPercent")] MetricSummary CpuPercent, [property: JsonPropertyName("memoryUsedPercent")] MetricSummary MemoryUsedPercent);
public sealed record NetworkTestResult([property: JsonPropertyName("endpoint")] string Endpoint, [property: JsonPropertyName("latencyMs")] double LatencyMs, [property: JsonPropertyName("uploadBytes")] int UploadBytes, [property: JsonPropertyName("elapsedMs")] double ElapsedMs);
