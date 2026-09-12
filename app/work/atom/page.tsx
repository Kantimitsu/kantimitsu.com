import type { Metadata } from 'next';
import { Code2 } from 'lucide-react';
import { PageIntro, PageShell } from '@/components/site-shell';
import { TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'Atom', description: 'Benchmark-first rendering, audio, and motorcycle dynamics built for radical lightness.' };

export default function AtomPage() {
  return (
    <PageShell>
      <PageIntro code="ATM-03" eyebrow="REAL PROJECT // TECHNICAL DEMONSTRATION" title="Build the benchmark before the module."><p>Atom explores real-time rendering, engine audio, and motorcycle behaviour under deliberately savage technical constraints.</p></PageIntro>
      <section className="content-section media-case"><img src="/work/atom-preview.png" alt="Technical route, elevation, and camber analysis used by Atom"/><div className="long-copy"><h2>The budget is the design</h2><p>The target is one twentieth of a 2008 Atom netbook: roughly one four-hundredth of a modern desktop core. Every module begins as a benchmark that defines its wall and fails loudly when the wall is crossed.</p><p>The project includes a 320×240 software renderer, performance-sensitive motorcycle dynamics, and physics-first procedural engine audio with zero heap allocation goals in critical paths.</p></div></section>
      <section className="content-section split-story"><TerminalPanel label="DOCTRINE" code="MEASURE//FIRST"><ul className="check-list"><li>Benchmark at operating load, never idle</li><li>Read state from the source of truth</li><li>Prefer determined behaviour over hand-tuned guesses</li><li>Every control must move a measurable output</li></ul></TerminalPanel><TerminalPanel label="OUTCOME" code="LIGHT//ENOUGH" tone="amber"><p>A working technical demonstration built around making limited hardware do more with less.</p><p>Basically: make the machine work harder, remove unnecessary crap, and see where it starts smoking.</p></TerminalPanel></section>
      <section className="content-section final-cta"><p>The repository link activates only after its current private source receives a deliberate secrets and licence audit.</p><span className="button disabled-link" aria-disabled="true"><Code2 size={16}/> SOURCE REVIEW PENDING</span></section>
    </PageShell>
  );
}
