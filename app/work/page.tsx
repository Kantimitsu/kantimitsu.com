import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/content';
import { PageIntro, PageShell } from '@/components/site-shell';
import { StatusTag } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'Work', description: 'Real Kantimitsu projects: streaming automation, emergent local-AI simulation, and benchmark-first rendering.' };

export default function WorkPage() {
  return (
    <PageShell>
      <PageIntro code="PROJECT-ARCHIVE" eyebrow="REAL SYSTEMS" title="Things I actually built.">
        <p>No invented customers. No suspiciously perfect percentage improvements. Just the problem, the machinery, and what happened.</p>
      </PageIntro>
      <section className="content-section project-grid">{projects.map(project => <a className="project-card" href={`/work/${project.slug}`} key={project.slug}><div><span>{project.code}</span><StatusTag>{project.status}</StatusTag></div><h2>{project.title}</h2><p>{project.strap}</p><p>{project.result}</p><strong>OPEN PROJECT FILE <ArrowRight size={16} /></strong></a>)}</section>
    </PageShell>
  );
}
