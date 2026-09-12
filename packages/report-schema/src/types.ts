export type Summary = { minimum: number; mean: number; maximum: number; p95: number };
export type DiagnosticReport = {
  schemaVersion: "1.0.0";
  collectorVersion: string;
  generatedAtUtc: string;
  consent: Record<"hardware" | "displays" | "audio" | "streamingSoftware" | "activeGame" | "benchmark" | "networkTest", boolean>;
  system: {
    os: string;
    architecture: string;
    cpu?: { name: string; logicalProcessors: number };
    memoryBytes?: number;
    gpus?: Array<{ name: string; memoryBytes?: number }>;
    displays?: Array<{ width: number; height: number; primary: boolean }>;
    audioDevices?: Array<{ name: string }>;
  };
  streamingSoftware?: Array<{ name: string; detected: boolean; version?: string }>;
  selectedGame?: { name: string; source: "user-selected" };
  benchmark?: { durationSeconds: number; sampleCount: number; cpuPercent: Summary; memoryUsedPercent: Summary };
  networkTest?: { endpoint: "https://kantimitsu.com"; latencyMs: number; uploadBytes: number; elapsedMs: number };
  warnings: string[];
};
