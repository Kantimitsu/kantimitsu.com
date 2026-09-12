# Diagnostic report data dictionary

The collector creates this report locally. Nothing is transmitted by the collector unless the user separately opts into the limited network test. The user can inspect and edit the JSON before attaching it to an enquiry.

| Section | Purpose | Typical data | Explicitly excluded |
| --- | --- | --- | --- |
| `consent` | Records which categories the user approved | Boolean choices | Implied or bundled consent |
| `system` | Design around the real machine | OS, architecture, CPU, memory, GPUs | Serial numbers, product keys, usernames, file paths |
| `displays` | Understand capture and routing constraints | Resolution and primary flag | Window titles and screen contents |
| `audioDevices` | Diagnose device topology | Friendly device names | Recordings, microphone audio |
| `streamingSoftware` | Understand the workflow | Presence and version of known tools | Process lists, command lines, arbitrary config files |
| `selectedGame` | Understand the intended workload | A game name typed by the user | Foreground-process inspection, launcher accounts, game files |
| `benchmark` | Observe short aggregate resource behaviour | Min/mean/max/p95 CPU and RAM percentages | Per-process surveillance, continuous monitoring |
| `networkTest` | Optional connectivity check against this site only | Latency, byte count, elapsed time | Browsing history, third-party endpoints |
| `warnings` | Explain omissions and partial results | Human-readable notes | Logs containing secrets or identifiers |

The canonical contract is [`packages/report-schema/report.schema.json`](../packages/report-schema/report.schema.json).
