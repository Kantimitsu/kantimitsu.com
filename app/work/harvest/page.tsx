import type { Metadata } from 'next';
import { PageIntro, PageShell } from '@/components/site-shell';
import { TerminalPanel } from '@/components/terminal-panel';

export const metadata: Metadata = { title: 'The Harvest Requires It', description: 'A local-AI Godot simulation where subjective beliefs collide with objective world truth.' };

export default function HarvestPage() {
  return (
    <PageShell>
      <PageIntro code="SIM-02" eyebrow="REAL PROJECT // CAVEMANSIM" title="The world knows the truth. The cavemen do not."><p>I wanted NPCs that could believe completely stupid things and then behave intelligently according to those stupid beliefs.</p></PageIntro>
      <section className="content-section media-case"><img src="/work/caveman-title.png" alt="The Harvest Requires It title screen: Change their minds. Regret everything."/><div className="long-copy"><h2>Subjective machinery</h2><p>Each person has needs, memories, relationships, personality, private beliefs, emotional reactions, and gossip. Objective world truth stays separate. The interesting behaviour comes from the gap between the two.</p><p>Local llama.cpp models generate thoughts and assist actions, while Godot owns reality and validates what can actually happen. False beliefs can change attention, goals, social behaviour, conflict, and survival decisions.</p></div></section>
      <section className="content-section split-story"><TerminalPanel label="TRACE THE WEIRDNESS" code="CAUSAL//LOG"><p>Append-only event and inference logs let bizarre behaviour be traced backwards through its causal chain instead of being shrugged at.</p></TerminalPanel><TerminalPanel label="TEST THE WEIRDNESS" code="FARM//AUTO" tone="amber"><p>Resettable unattended simulation farms exercise beliefs, trust-weighted gossip, farming, hunting, family formation, and graceful local-model fallback.</p></TerminalPanel></section>
      <section className="content-section result-band"><span>RESULT</span><p>The simulation produces long chains of emergent behaviour from simple interventions. It is also very good at exposing its own architectural failures, some of which are spectacular.</p></section>
    </PageShell>
  );
}
