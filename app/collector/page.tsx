import type { Metadata } from 'next';
import { CheckCircle2, Code2, Eye, ShieldCheck, XCircle } from 'lucide-react';
import { BuckimitsuGarnish } from '@/components/buckimitsu';
import { PageIntro, PageShell } from '@/components/site-shell';
import { StatusTag, TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'Benchmark Collector', description: 'See exactly what the open-source Kantimitsu Benchmark Collector reads, excludes, and saves before downloading the Windows beta.' };

const collected = ['Windows version and architecture as the report baseline', 'Separately approved CPU model, logical threads, installed RAM, GPU model, and reported VRAM', 'Separately approved display resolutions and primary-display flag', 'Separately approved audio-device friendly names', 'Presence and version of a small allow-list of streaming tools: OBS Studio, TikTok LIVE Studio, Streamer.bot, TikFinity, and SteelSeries GG', 'A game name you type yourself—no foreground-process inspection', 'Optional 30-second aggregate CPU and RAM sample', 'Optional latency and 256 KiB upload test against kantimitsu.com only'];
const prohibited = ['Passwords, tokens, cookies, browser history, or credential stores', 'Keystrokes, clipboard, screenshots, webcam, microphone, or desktop capture', 'Messages, contacts, documents, photos, or unrelated filenames', 'Complete process or installed-application lists', 'Serial numbers, product keys, MAC/IP addresses, username, or computer name', 'OBS stream keys, service credentials, plugin secrets, or account identifiers', 'Other Windows users’ data'];
const sample = '{\n  "schemaVersion": "1.0.0",\n  "collectorVersion": "0.1.0-beta",\n  "consent": { "hardware": true, "benchmark": false },\n  "system": {\n    "os": "Microsoft Windows 11",\n    "architecture": "X64"\n  },\n  "warnings": []\n}';

export default function CollectorPage() {
  return (
    <PageShell>
      <PageIntro code="KBC-0.1.0-BETA" eyebrow="LOCAL-FIRST WINDOWS DIAGNOSTICS" title="Inspect first. Then download.">
        <p>The collector exists so I can understand a streamer’s real machine without beginning with remote access or a questionnaire based on optimistic memory.</p>
        <div className="inline-status"><StatusTag tone="amber">PUBLIC BETA</StatusTag><StatusTag tone="amber">UNSIGNED</StatusTag><StatusTag>LOCAL REPORT ONLY</StatusTag></div>
      </PageIntro>
      <section className="content-section trust-grid">
        <TerminalPanel label="WHAT IT READS" code="CONSENT//REQUIRED"><ul className="icon-list">{collected.map(item => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></TerminalPanel>
        <TerminalPanel label="WHAT IT NEVER READS" code="HARD//DENY" tone="red"><ul className="icon-list">{prohibited.map(item => <li key={item}><XCircle size={17} />{item}</li>)}</ul></TerminalPanel>
      </section>
      <section className="content-section flow-section">
        <div className="section-heading"><p className="eyebrow">CONTROL FLOW // NOTHING SILENT</p><h2>You approve every boundary.</h2></div>
        <ol className="process-list compact"><li><span>01</span><div><h3>Read the scope</h3><p>Every category expands into the exact fields and why they help.</p></div></li><li><span>02</span><div><h3>Give explicit consent</h3><p>Nothing is pre-checked.</p></div></li><li><span>03</span><div><h3>Review and redact</h3><p>Remove sections or approved names before saving.</p></div></li><li><span>04</span><div><h3>Save locally</h3><p>Attach the JSON to an enquiry only if you choose.</p></div></li></ol>
      </section>
      <section className="content-section report-preview">
        <TerminalPanel label="SAMPLE REPORT" code="SCHEMA//1.0.0">
          <pre>{sample}</pre>
          <div className="hero-actions"><a className="button" href="/docs/sample-report.json"><Eye size={16}/> SAMPLE JSON</a><a className="button" href="/docs/report.schema.json">JSON SCHEMA</a><a className="button" href="/collector/data-dictionary">DATA DICTIONARY</a></div>
        </TerminalPanel>
      </section>
      <section className="content-section download-zone">
        <TerminalPanel label="CURRENT RELEASE" code="WIN-X64//PORTABLE">
          <div className="release-row"><div><span>VERSION</span><strong>0.1.0-beta</strong></div><div><span>RELEASED</span><strong>13 SEP 2026</strong></div><div><span>SIGNING</span><strong>Unsigned</strong></div></div>
          <p>This beta is not code-signed, so Windows SmartScreen may warn. Verify the complete SHA-256 shown in the GitHub release before running it. The self-contained build is large because it carries the .NET runtime instead of making your PC find one.</p>
          <p className="checksum"><span>SHA-256 // ZIP</span><code>EB74FDFF8469803C86B3958978BFE9C26847DE0398049D16CF736BF49515B1EF</code></p>
          <div className="hero-actions"><a className="button primary" href="https://github.com/Kantimitsu/kantimitsu.com/releases/download/v0.1.0-beta/Kantimitsu.Collector-0.1.0-beta-win-x64.zip">DOWNLOAD WINDOWS BETA</a><a className="button" href="https://github.com/Kantimitsu/kantimitsu.com"><Code2 size={16}/> SOURCE REPOSITORY</a></div>
          <BuckimitsuGarnish caption="BUCKIMITSU // WAITING FOR THE BUILD LIGHT" pose="static" />
        </TerminalPanel>
      </section>
      <section className="content-section trust-summary"><div><ShieldCheck size={34}/><h2>No persistence. No surprise telemetry.</h2><p>The portable beta is removed by deleting its folder and any reports you chose to save. Closing it cancels collection and leaves no service behind.</p></div><a className="button" href="/privacy">READ PRIVACY DETAILS</a></section>
    </PageShell>
  );
}
