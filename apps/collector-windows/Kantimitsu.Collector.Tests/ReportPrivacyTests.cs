using System.Text.Json;
using Kantimitsu.Collector.Models;
using Kantimitsu.Collector.Services;
using Xunit;

namespace Kantimitsu.Collector.Tests;

public sealed class ReportPrivacyTests
{
    private static readonly Consent NoOptionalConsent = new(false, false, false, false, false, false, false);

    [Fact]
    public void EmptyConsentOmitsEveryOptionalCollectionSection()
    {
        var report = new DiagnosticReport
        {
            Consent = NoOptionalConsent,
            System = new SystemSnapshot { Os = "Windows", Architecture = "X64" }
        };

        var json = CollectorService.Serialize(report);
        using var document = JsonDocument.Parse(json);
        var root = document.RootElement;

        Assert.False(root.TryGetProperty("streamingSoftware", out _));
        Assert.False(root.TryGetProperty("selectedGame", out _));
        Assert.False(root.TryGetProperty("benchmark", out _));
        Assert.False(root.TryGetProperty("networkTest", out _));
        Assert.DoesNotContain(Environment.UserName, json, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void GeneratedShapeContainsNoProhibitedFieldNames()
    {
        var report = new DiagnosticReport
        {
            Consent = NoOptionalConsent,
            System = new SystemSnapshot { Os = "Windows 11", Architecture = "X64" }
        };
        using var document = JsonDocument.Parse(CollectorService.Serialize(report));
        var keys = EnumerateKeys(document.RootElement).ToHashSet(StringComparer.OrdinalIgnoreCase);
        string[] prohibited = ["username", "computerName", "ipAddress", "macAddress", "serialNumber", "productKey", "password", "token", "cookie", "filePath", "processList"];
        Assert.Empty(prohibited.Intersect(keys, StringComparer.OrdinalIgnoreCase));
    }

    [Fact]
    public void UserSelectedGameCarriesAnExplicitSource()
    {
        var report = new DiagnosticReport
        {
            Consent = NoOptionalConsent with { ActiveGame = true },
            System = new SystemSnapshot { Os = "Windows", Architecture = "X64" },
            SelectedGame = new SelectedGame("Tekken 8")
        };
        var json = CollectorService.Serialize(report);
        Assert.Contains("\"source\": \"user-selected\"", json);
    }

    private static IEnumerable<string> EnumerateKeys(JsonElement element)
    {
        if (element.ValueKind == JsonValueKind.Object)
            foreach (var property in element.EnumerateObject()) { yield return property.Name; foreach (var child in EnumerateKeys(property.Value)) yield return child; }
        else if (element.ValueKind == JsonValueKind.Array)
            foreach (var item in element.EnumerateArray()) foreach (var child in EnumerateKeys(item)) yield return child;
    }
}
