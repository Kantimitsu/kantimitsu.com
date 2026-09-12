import type { Metadata } from 'next';
import { PageIntro, PageShell } from '@/components/site-shell';
import { BuckimitsuGarnish } from '@/components/buckimitsu';
import { StatusTag, TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'Kantimitsu Stream Tools', description: 'The real Windows session manager behind a Tekken treadmill stream.' };

export default function StreamToolsPage() {
  return (
    <PageShell>
      <PageIntro code="STR-01" eyebrow="REAL PROJECT // IN ACTIVE USE" title="A treadmill stream became an operating system."><p>I built a stream where viewers can make me run faster, then had to build software to stop the entire setup becoming a Rube Goldberg machine.</p><StatusTag>USED ON MY STREAMING PC</StatusTag></PageIntro>
      <section className="content-section prose-grid">
        <article className="long-copy"><h2>The mechanic</h2><p>I stream Tekken, mainly playing Yoshimitsu, while walking or running on a treadmill. Viewer support can change the treadmill speed: they do something, the software reacts, the treadmill changes, I suffer slightly, and they laugh.</p><p>It combines exercise, streaming, and an audience mechanic because spare time is not an infinite resource. Cables and treadmills are a poor combination unless falling over on camera is part of the content strategy.</p><h2>The ridiculous setup</h2><p>The stack includes OBS, TikTok LIVE Studio, vertical-video routing, treadmill control, donation behaviour, Bluetooth audio, microphone diagnostics, performance settings, process monitoring, and Windows deciding today is the day something should be different.</p><h2>The session manager</h2><p>The tool launches applications in order, verifies that expected receivers and hardware are actually ready, runs a real microphone preflight, applies reversible performance configuration, and reports failures instead of treating “the process exists” as success.</p><p>Shutdown matters just as much. Applications receive normal close requests first. Helpers that restore Windows are never force-killed. The power plan and changed priorities are verified after restoration. I do not simply throw a taskkill grenade at everything.</p></article>
        <aside><TerminalPanel label="SESSION SEQUENCE" code="ORDER//MATTERS"><ol className="compact-steps"><li>Resource guard</li><li>Audio and Sonar</li><li>Treadmill controller</li><li>Donation integrations</li><li>Streamer.bot</li><li>OBS Studio</li><li>TikTok LIVE Studio</li><li>Microphone signal test</li><li>Stream</li><li>Graceful reverse shutdown</li></ol></TerminalPanel><BuckimitsuGarnish caption="BUCKIMITSU // PACE MATCHED TO SUFFERING" /></aside>
      </section>
      <section className="content-section result-band"><span>RESULT</span><p>My streaming workflow is substantially more automated, repeatable, and less annoying. I actively use this software; it is not a demo project.</p></section>
    </PageShell>
  );
}
