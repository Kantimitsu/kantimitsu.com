import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/site-shell";
import { TerminalPanel } from "@/components/terminal-panel";

export const metadata: Metadata = { title: "Collector Data Dictionary", description: "Plain-language field guide for the Kantimitsu diagnostic report." };

const rows = [
  ["consent", "The exact categories the user approved", "No bundled or implied consent"],
  ["system", "Windows, architecture and approved hardware summary", "No serials, keys, usernames or paths"],
  ["displays", "Resolution and primary-display flag", "No window titles or screen contents"],
  ["audioDevices", "Approved friendly device names", "No recording or microphone audio"],
  ["streamingSoftware", "Presence/version of five known tools", "No arbitrary application or process list"],
  ["selectedGame", "A game name the user deliberately types", "No foreground-process or launcher inspection"],
  ["benchmark", "30 aggregate CPU/RAM samples", "No per-process or continuous monitoring"],
  ["networkTest", "Latency and byte totals against this site", "No third-party endpoints or IP stored in report"],
  ["warnings", "What was omitted or unavailable", "No raw logs containing identifiers"]
];

export default function DataDictionaryPage() {
  return <PageShell><PageIntro code="SCHEMA-1.0.0" eyebrow="PUBLIC REPORT CONTRACT" title="Every field has a job."><p>If a field cannot explain why it belongs, it does not get to live in the report.</p></PageIntro><section className="content-section"><TerminalPanel label="DATA DICTIONARY" code="ALLOWLIST//ONLY"><div className="table-wrap"><table><thead><tr><th>Section</th><th>Purpose</th><th>Explicit exclusion</th></tr></thead><tbody>{rows.map(([field,purpose,excluded]) => <tr key={field}><td><code>{field}</code></td><td>{purpose}</td><td>{excluded}</td></tr>)}</tbody></table></div><div className="hero-actions"><a className="button" href="/docs/report.schema.json">OPEN JSON SCHEMA</a><a className="button" href="/docs/sample-report.json">OPEN SAMPLE</a></div></TerminalPanel></section></PageShell>;
}
