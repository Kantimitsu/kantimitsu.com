import { ArrowDown, ArrowRight, Cpu, Radio, Terminal } from 'lucide-react';
import { BuckimitsuGarnish } from '@/components/buckimitsu';
import { PageShell } from '@/components/site-shell';
import { StatusTag, TerminalPanel } from '@/components/terminal-panel';
import { projects, services } from '@/lib/content';

export default function Home() {
  return (
    <PageShell>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><Terminal size={15} /> SYSTEM PURPOSE // CUSTOM STREAMING SOFTWARE</p>
          <h1>Built around your <em>actual</em> setup.</h1>
          <p className="lede">I build focused Windows tools, stream automation, integrations, and performance fixes. Mostly because something annoyed me enough that I decided it should stop existing.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/contact">DISCUSS A PROJECT</a>
            <a className="button" href="/collector">SEE HOW BENCHMARKING WORKS</a>
          </div>
          <dl className="hero-status" aria-label="Service status">
            <div><dt>PLATFORM</dt><dd>WINDOWS</dd></div>
            <div><dt>LOCATION</dt><dd>CHRISTCHURCH, NZ</dd></div>
            <div><dt>MODE</dt><dd><span className="status-dot" /> TAKING ENQUIRIES</dd></div>
          </dl>
        </div>
        <div className="terminal-visual" aria-label="Kantimitsu engineering principles">
          <div className="terminal-label">▌ OPERATING DOCTRINE ▐ <span>KNT-01</span></div>
          <div className="terminal-screen">
            <p><span>01</span> DO THE JOB.</p>
            <p><span>02</span> USE THE RESOURCES YOU NEED.</p>
            <p><span>03</span> RESTORE THE MACHINE AFTERWARDS.</p>
            <p className="terminal-warning"><span>04</span> DO NOT THROW A TASKKILL GRENADE.</p>
          </div>
          <BuckimitsuGarnish />
        </div>
        <a className="scroll-cue" href="#work" aria-label="Continue to selected work"><ArrowDown size={18} /> SYSTEM ONLINE</a>
      </section>

      <section className="preview-strip">
        <span><Radio size={15} /> LIVE SYSTEMS</span>
        <strong>STREAM TOOLS</strong><strong>THE HARVEST REQUIRES IT</strong><strong>ATOM</strong>
      </section>

      <section className="content-section story-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">SELECTED WORK // THINGS THAT ACTUALLY EXIST</p>
          <h2>Built, broken, improved.</h2>
          <p>These are not fictional client transformations. They are real systems built around real constraints, including some constraints created by my own questionable decisions.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <a className="project-card" href={`/work/${project.slug}`} key={project.slug}>
              <div><span>{project.code}</span><StatusTag>{project.status}</StatusTag></div>
              <h3>{project.title}</h3>
              <p>{project.strap}</p>
              <strong>OPEN PROJECT FILE <ArrowRight size={16} /></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="content-section split-story">
        <TerminalPanel label="WHY THE TREADMILL" code="STR//ORIGIN">
          <Cpu className="panel-icon" size={26} />
          <h2>A practical dad solution to a very stupid problem.</h2>
          <p>I stream Tekken, mainly playing Yoshimitsu, while walking or running on a treadmill. Viewers can change how hard I have to work.</p>
          <p>They do something → the software reacts → the treadmill changes → I suffer slightly → they laugh.</p>
          <a className="text-link" href="/work/stream-tools">READ THE FULL MECHANICAL FAILURE CHAIN <ArrowRight size={15} /></a>
        </TerminalPanel>
        <TerminalPanel label="HARDWARE HAS LIMITS. GOOD." code="PERF//1660S" tone="amber">
          <h2>Inefficient code cannot hide here.</h2>
          <p>My streaming machine has a Ryzen 7 2700X, GTX 1660 Super, 6 GB of VRAM, and 16 GB of RAM. Perfectly capable. Limited enough to expose nonsense.</p>
          <p>Your streaming utility should leave the expensive hardware for the game.</p>
          <a className="text-link" href="/about">WHY I BUILD THIS WAY <ArrowRight size={15} /></a>
        </TerminalPanel>
      </section>

      <section className="content-section" id="services">
        <div className="section-heading">
          <p className="eyebrow">SERVICES // EARLY-STAGE, AVAILABLE FOR ENQUIRY</p>
          <h2>Remove repetitive nonsense.</h2>
          <p>Scoped Windows and streaming work based on the machine, workflow, and strange pile of applications you actually use.</p>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text }) => (
            <article className="service-item" key={title}><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <a className="button centered-button" href="/services">VIEW SERVICE PARAMETERS</a>
      </section>

      <section className="content-section collector-callout" id="collector">
        <div>
          <p className="eyebrow">BENCHMARK COLLECTOR // PUBLIC BETA</p>
          <h2>Understand the real machine. Then design around reality.</h2>
          <p>A transparent Windows utility for collecting only the hardware, streaming, and performance details needed during project discovery. You review the report before you save or share anything.</p>
          <div className="hero-actions"><a className="button button-primary" href="/collector">INSPECT THE COLLECTOR</a><a className="button" href="/docs/sample-report.json">VIEW SAMPLE JSON</a></div>
        </div>
        <TerminalPanel label="TRUST STATUS" code="LOCAL//FIRST">
          <ul className="check-list">
            <li>Runs only after visible consent</li><li>Local report first</li><li>No administrator access</li><li>No background service</li><li>No passwords, tokens, messages, screenshots, or complete process list</li><li>Source and checksum published</li>
          </ul>
        </TerminalPanel>
      </section>

      <section className="content-section final-cta" id="contact">
        <p className="eyebrow">OPEN CHANNEL // NO SYNERGY REQUIRED</p>
        <h2>Tell me what is annoying you.</h2>
        <p>If the idea is useful, feasible, and suited to the hardware involved, we can scope it. If it is a bad idea, I will probably tell you before billing you for it.</p>
        <a className="button button-primary" href="/contact">DISCUSS A PROJECT <ArrowRight size={16} /></a>
      </section>
    </PageShell>
  );
}
