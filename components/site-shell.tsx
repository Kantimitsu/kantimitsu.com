import { Code2, Mail } from 'lucide-react';
import { MagneticDeflection } from './magnetic-deflection';

const links = [
  ['WORK', '/work'],
  ['SERVICES', '/services'],
  ['PROCESS', '/process'],
  ['COLLECTOR', '/collector'],
  ['ABOUT', '/about'],
  ['CONTACT', '/contact'],
];

export function SiteHeader() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Kantimitsu home">
        <span className="status-dot" aria-hidden="true" />KANTIMITSU
      </a>
      <nav aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <span className="system-clock">CHC // NZST</span>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>KANTIMITSU</strong>
        <p>One technically competent goblin building useful things in Christchurch, New Zealand.</p>
      </div>
      <div className="footer-links">
        <a href="https://github.com/Kantimitsu"><Code2 size={16} /> GitHub</a>
        <a href="mailto:hello@kantimitsu.com"><Mail size={16} /> hello@kantimitsu.com</a>
        <a href="/privacy">Privacy</a>
      </div>
      <small>© {new Date().getFullYear()} Kantimitsu // FORMAL BUSINESS DETAILS REQUIRED BEFORE COMMERCIAL LAUNCH</small>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="site-shell">
      <div className="crt-noise" aria-hidden="true" />
      <MagneticDeflection />
      <div className="crt-content">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}

export function PageIntro({ code, eyebrow, title, children }: { code: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow} <span>{`// ${code}`}</span></p>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </section>
  );
}
