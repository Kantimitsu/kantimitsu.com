import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { PageIntro, PageShell } from '@/components/site-shell';
import { TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'Contact', description: 'Discuss a custom Windows streaming tool or diagnostics project with Kantimitsu.' };

export default function ContactPage() {
  return (
    <PageShell>
      <PageIntro code="COMMS-OPEN" eyebrow="PROJECT ENQUIRY" title="What is annoying you?">
        <p>Describe the real problem, the hardware and software involved, and what you want to stop doing manually.</p>
      </PageIntro>
      <section className="content-section contact-layout">
        <TerminalPanel label="TRANSMISSION FORM" code="TLS//FORM"><ContactForm /></TerminalPanel>
        <aside>
          <TerminalPanel label="WHAT HAPPENS NEXT" code="NO//AMBUSH">
            <ol className="compact-steps"><li>I read the enquiry.</li><li>I ask questions if the boundary is unclear.</li><li>If it makes sense, I provide a written scope and quote.</li><li>If it is a bad idea, I say so.</li></ol>
          </TerminalPanel>
          <p className="privacy-note">Prefer plain email? Use <a href="mailto:hello@kantimitsu.com">hello@kantimitsu.com</a>. By submitting, you permit Kantimitsu to use the supplied details to respond. Read the <a href="/privacy">privacy statement</a>.</p>
        </aside>
      </section>
    </PageShell>
  );
}
