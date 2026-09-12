import type { Metadata } from 'next';
import { PageIntro, PageShell } from '@/components/site-shell';
import { TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'Privacy', description: 'Plain-language privacy statement for the Kantimitsu website and Benchmark Collector.' };

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageIntro code="PRIVACY-0.1" eyebrow="OWNER REVIEW REQUIRED BEFORE COMMERCIAL LAUNCH" title="What is collected, and why.">
        <p>This statement describes the public beta and enquiry site as implemented. It does not promise infrastructure that does not exist.</p>
      </PageIntro>
      <section className="content-section privacy-copy">
        <TerminalPanel label="WEBSITE ENQUIRIES" code="RETENTION//12M"><p>The form collects the name or handle, preferred contact details, streaming platforms, project description, and optional budget, date, and report you provide. It is used only to assess and respond to the enquiry.</p><p>Submissions are delivered through Resend to <strong>hello@kantimitsu.com</strong>, forwarded by Cloudflare Email Routing, and held in a private Gmail mailbox. The site does not keep an enquiry database. Inactive enquiry threads are deleted after 12 months.</p></TerminalPanel>
        <TerminalPanel label="BENCHMARK REPORTS" code="RETENTION//30D"><p>The collector creates reports locally. Kantimitsu receives one only when you attach it to an enquiry or send it yourself. Unattached reports received by email are deleted after 30 days. Reports associated with active work are retained only while operationally or legally needed.</p><p>You can use the enquiry form without a report and can provide system details manually instead.</p></TerminalPanel>
        <TerminalPanel label="NETWORK AND ACCESS DATA" code="INFRA//ORDINARY"><p>Cloudflare and the Vultr-hosted service may process IP address, request time, requested path, browser information, and security signals as part of ordinary delivery, rate limiting, and abuse prevention. The site does not use advertising trackers or analytics.</p><p>An optional collector network test sends disposable test traffic only after you start it. The public IP is not placed in the report.</p></TerminalPanel>
        <TerminalPanel label="YOUR CHOICES AND RIGHTS" code="NZ//PRIVACY"><p>You may ask whether Kantimitsu holds personal information about you, request access or correction, or ask for deletion where it is no longer required. Contact <a href="mailto:hello@kantimitsu.com">hello@kantimitsu.com</a>.</p><p>Kantimitsu operates from Christchurch, New Zealand. Formal legal/business identity details require owner review before commercial launch and are not invented here.</p></TerminalPanel>
        <p className="privacy-note">Third parties involved: Cloudflare for DNS, security, tunnel delivery, and email forwarding; Vultr for server hosting; Resend for form-email delivery; Google for the destination mailbox; and GitHub for source and release downloads. Their own policies also apply to their processing.</p>
      </section>
    </PageShell>
  );
}
