import type { Metadata } from 'next';
import { PageIntro, PageShell } from '@/components/site-shell';

export const metadata: Metadata = { title: 'Process', description: 'How a Kantimitsu streaming-software project moves from annoying problem to working tool.' };

const steps = [
  ['01', 'Short discovery conversation', 'Explain what is annoying, what already exists, and what the finished behaviour should be.'],
  ['02', 'Optional benchmark report', 'Run the Collector or provide the same details manually. The utility is useful, never compulsory.'],
  ['03', 'Written scope and quote', 'You receive the boundary, deliverables, price, assumptions, and anything deliberately excluded.'],
  ['04', 'Prototype or milestone build', 'The risky part gets proven early instead of being hidden under weeks of decorative progress.'],
  ['05', 'Test on the real setup', 'Your games, devices, plugins, and failure cases matter more than a clean development machine.'],
  ['06', 'Delivery and support', 'You receive the tool, setup notes, source terms, and an agreed support period.'],
];

export default function ProcessPage() {
  return (
    <PageShell>
      <PageIntro code="PROC-06" eyebrow="ENGAGEMENT SEQUENCE" title="From irritating to operational.">
        <p>Enough process to keep the work predictable. Not enough process to require a meeting about the next meeting.</p>
      </PageIntro>
      <section className="content-section"><ol className="process-list">{steps.map(([number,title,text]) => <li key={number}><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div></li>)}</ol></section>
    </PageShell>
  );
}
