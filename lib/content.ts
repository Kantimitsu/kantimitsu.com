import { Bot, Gauge, MonitorCog, Radio, Settings, Wrench } from 'lucide-react';

export const services = [
  { icon: MonitorCog, title: 'Stream session automation', text: 'Start the right applications in the right order, verify the hardware that matters, and put the machine back afterwards.' },
  { icon: Radio, title: 'OBS and platform integration', text: 'OBS scripts, WebSocket integrations, Streamer.bot actions, browser sources, alerts, chat, and platform glue.' },
  { icon: Gauge, title: 'Performance diagnostics', text: 'Find out what is stealing CPU, GPU, VRAM, or encoder headroom from the game and the broadcast.' },
  { icon: Settings, title: 'Purpose-built Windows tools', text: 'Small desktop utilities built around the creator’s actual workflow instead of an imaginary average user.' },
  { icon: Wrench, title: 'Maintenance and repair', text: 'Untangle fragile existing tools, shutdown problems, routing failures, and automation that only works on Tuesdays.' },
  { icon: Bot, title: 'Local AI and strange machinery', text: 'Local inference, hardware-aware automation, simulation, and carefully scoped experiments where the weirdness has a job.' },
];

export const projects = [
  {
    slug: 'stream-tools',
    code: 'STR-01',
    title: 'Kantimitsu Stream Tools',
    strap: 'A stream session manager built after “open OBS” became a small operational doctrine.',
    status: 'IN ACTIVE USE',
    result: 'My own streaming workflow is substantially more automated, repeatable, and less annoying.',
  },
  {
    slug: 'harvest',
    code: 'SIM-02',
    title: 'The Harvest Requires It',
    strap: 'Cavemen form incorrect beliefs and then behave intelligently according to them.',
    status: 'WORKING SIMULATION',
    result: 'Simple interventions produce long, traceable chains of emergent behaviour and spectacular architectural failures.',
  },
  {
    slug: 'atom',
    code: 'ATM-03',
    title: 'Atom',
    strap: 'A motorcycle project where every subsystem has to show its benchmark before it gets to exist.',
    status: 'TECHNICAL DEMONSTRATION',
    result: 'Software rendering, procedural engine audio, and benchmark-first engineering under a deliberately savage compute budget.',
  },
];
