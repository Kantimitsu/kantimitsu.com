import type { Metadata } from 'next';
import { Code2 } from 'lucide-react';
import { BuckimitsuGarnish } from '@/components/buckimitsu';
import { PageIntro, PageShell } from '@/components/site-shell';
import { TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'About', description: 'Kantimitsu: streamer, dad, and builder of practical software in Christchurch, New Zealand.' };

export default function AboutPage() {
  return (
    <PageShell>
      <PageIntro code="OPERATOR-01" eyebrow="ABOUT THE OPERATOR" title="One technically competent goblin.">
        <p>I am a married father with young boys, a full-time job, limited spare time, and a habit of building software because something annoyed me enough that I decided it should stop existing.</p>
      </PageIntro>
      <section className="content-section prose-grid">
        <article className="long-copy">
          <h2>The development loop</h2>
          <p>A lot of what I build starts with a real problem I personally have. I use the thing. I break the thing. I discover what is stupid about the thing. Then I improve it.</p>
          <p>Most of my recent work sits around streaming automation, Windows tooling, local AI, simulation, Android apps, backend services, performance-constrained software, game-adjacent experiments, and hardware-aware automation.</p>
          <p>I use AI-assisted development heavily, but judgement still matters. AI can produce perfectly reasonable instructions in the wrong direction. My job is not just to make code appear quickly. It is to decide whether the thing being built is actually the right thing.</p>
          <h2>Things I prefer</h2>
          <p>Fast, understandable software. Local where practical. Automation that removes repetitive nonsense. Systems that explain what they are doing. Hardware people actually own.</p>
          <p>I am less enthusiastic about software that launches fourteen helper processes, eats half the machine, requires a subscription to open a settings page, and calls that architecture.</p>
        </article>
        <aside>
          <TerminalPanel label="OPERATOR RECORD" code="CHC//NZ">
            <dl className="spec-list"><div><dt>HANDLE</dt><dd>Kantimitsu</dd></div><div><dt>LOCATION</dt><dd>Christchurch, New Zealand</dd></div><div><dt>TIME ZONE</dt><dd>NZST / NZDT</dd></div><div><dt>BUILD STYLE</dt><dd>Constrained, local-first, explainable</dd></div></dl>
            <a className="text-link" href="https://github.com/Kantimitsu"><Code2 size={15} /> GITHUB PROFILE</a>
          </TerminalPanel>
          <BuckimitsuGarnish caption="BUCKIMITSU // MANAGEMENT IS OBSERVING" pose="static" />
        </aside>
      </section>
    </PageShell>
  );
}
