import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/content';
import { PageIntro, PageShell } from '@/components/site-shell';
import { TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'Services', description: 'Custom Windows streaming automation, diagnostics, integrations, and focused creator tools.' };

const details = [
  ['Stream session automation', 'Your application list, startup dependencies, hardware checks, failure conditions, and required restoration state.', 'A documented Windows utility, editable configuration, failure reporting, and agreed support period.'],
  ['OBS and platform integration', 'OBS version and configuration, platforms, plugins, Streamer.bot actions, browser sources, and the event flow.', 'The smallest useful plugin, script, action set, overlay, or integration plus setup documentation.'],
  ['Performance diagnostics', 'Your hardware, game, encoder, output targets, current bottleneck, and a reproducible test scene.', 'Measured findings, prioritised fixes, configuration changes, and tooling where automation is justified.'],
  ['Purpose-built Windows tools', 'The repetitive job, applications involved, safety constraints, and what must happen when something fails.', 'A focused portable utility that does the job and does not bring fourteen helper processes as emotional support.'],
  ['Maintenance and repair', 'Existing source or executable behaviour, logs you approve, failure steps, and the intended contract.', 'A repaired build, documented cause, regression tests, and a plain explanation of what was wrong.'],
  ['Local AI and strange machinery', 'Hardware limits, privacy boundary, model size, latency target, and the part that actually benefits from inference.', 'A local-first prototype or system with fallbacks, measured constraints, and no vague AI seasoning.'],
];

export default function ServicesPage() {
  return (
    <PageShell>
      <PageIntro code="SVC-INDEX" eyebrow="AVAILABLE FOR SCOPED ENQUIRY" title="Tools with a job to do.">
        <p>I work primarily on Windows streaming automation and diagnostics. The service is early-stage; the systems and experience behind it are real.</p>
      </PageIntro>
      <section className="content-section">
        <div className="detail-list">
          {details.map(([title, inputs, delivery], index) => {
            const Icon = services[index].icon;
            return (
              <TerminalPanel key={title} label={title.toUpperCase()} code={`SVC-0${index + 1}`}>
                <Icon className="panel-icon" size={24} />
                <div className="service-detail"><div><h3>WHAT I NEED</h3><p>{inputs}</p></div><div><h3>WHAT YOU RECEIVE</h3><p>{delivery}</p></div></div>
              </TerminalPanel>
            );
          })}
        </div>
      </section>
      <section className="content-section final-cta"><h2>Request a scoped quote.</h2><p>No mystery tiers. We define the problem, the boundary, and what “finished” means.</p><a className="button button-primary" href="/contact">DISCUSS THE PROBLEM <ArrowRight size={16} /></a></section>
    </PageShell>
  );
}
