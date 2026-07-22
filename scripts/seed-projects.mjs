/**
 * seed-projects.mjs
 * Populates the PocketBase `projects` collection with Erik Fouyer's portfolio cards.
 *
 * Usage:
 *   PB_URL=http://localhost:8091 PB_EMAIL=... PB_PASSWORD=... node scripts/seed-projects.mjs
 *   (or set vars in .env.local and the script reads them)
 *
 * Options:
 *   --dry-run   Print the payload without creating records
 *   --wipe      Delete all existing records before seeding (use with caution)
 */

const PB_URL      = process.env.PB_URL      || 'http://localhost:8091';
const PB_EMAIL    = process.env.PB_EMAIL    || 'marcos.fouyer@gmail.com';
const PB_PASSWORD = process.env.PB_PASSWORD || '';
const DRY_RUN     = process.argv.includes('--dry-run');
const WIPE        = process.argv.includes('--wipe');

// ─── Project data ─────────────────────────────────────────────────────────────
// Items follow the classification from 2026-07-22 session.
// Item #5 intentionally absent (confirmed non-existent by Marcos).
// Items 4, 14, 15 have no image by decision — image field stays empty.

const PROJECTS = [
  // ── 8 ── OpenClaude (STAR — first, most depth) ──────────────────────────────
  {
    title: 'OpenClaude — Personal AI Operating System',
    description:
      'A fully custom multi-agent AI system built from scratch on Claude Code — designed as a personal "AI COO" that runs around the clock.\n\n' +
      'Aura acts as the central orchestrator and manages a team of specialist agents: Forge (infrastructure & DevOps), Helix (full-stack development), ' +
      'Lumus (career strategy), Anima (psychological support), and Axiomus (structured learning).\n\n' +
      'What separates it from a chatbot setup is its complete human-interface stack: the system has its own email address, a real phone number ' +
      '(Telnyx integration for outbound/inbound calls), full voice I/O with speech-to-text and text-to-speech on Telegram, and image generation via ' +
      'the Gemini API — the same input/output channels a human assistant would use.\n\n' +
      'Architecture includes: multi-layer persistent memory (short-term working memory + curated long-term memory + daily AI consolidation), ' +
      'a modular skills system, production-grade safety hooks and approval gates, Telegram and Slack bridges, Google Workspace integration, ' +
      'Obsidian, Tailscale, Docker, Proxmox, and Cloudflare. Demonstrates AI systems architecture, multi-agent orchestration, LLM application ' +
      'engineering, prompt engineering, and AI governance at production scale.',
    tags: 'Multi-Agent AI, Claude Code, MCP, Python, Telegram, Telnyx, Docker, AI Architecture, AI Governance, Prompt Engineering',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 13 ── AI Adoption POC ────────────────────────────────────────────────────
  {
    title: 'AI Adoption POC — B2B Service Desk',
    description:
      'A rigorous proof-of-concept for AI adoption in a B2B telecom Service Desk, designed and led by Marcos Fouyer at MEO Empresas. ' +
      'Two AI agents were deployed: Agent A classified ticket criticality with a built-in confidence floor ' +
      '(refuses to classify when uncertain rather than guessing); Agent B drafted client-facing emails within a strict ' +
      'rule hierarchy — pre-approved templates override general guidelines, brand style guide is the final arbiter.\n\n' +
      '12 assistants across 2 teams participated over 4 weeks. Results: 65% adoption, 43% reduction in email ' +
      'composition time for Team BTS (p<0.0001), 83% of AI outputs used with minimal edits, 100% style compliance. ' +
      'Projected savings: €17,725–35,100/year combined across both teams.\n\n' +
      'Delivered an interactive HTML executive report with embedded financial simulators, presenting conservative ' +
      '(median) and realistic (mean) scenarios side by side. Statistical outlier exclusions were formal management-confirmed ' +
      'decisions — not silent discards. Final recommendation: adopt both agents, with explicit change management for Agent A.',
    tags: 'Microsoft Copilot, Copilot Studio, Prompt Engineering, AI Strategy, ROI Analysis, B2B, Statistics',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 1 ── MicroStrategy Dashboard ─────────────────────────────────────────────
  {
    title: 'Operational KPI Dashboard',
    description:
      'A real-time KPI monitoring system built with MicroStrategy for a B2B service operation at MEO. ' +
      'Transformed functional requirements into measurable indicators with automated hourly reporting and ' +
      'a traffic-light baseline system: green (above baseline), amber (within risk range), red (below threshold — triggers alert).\n\n' +
      'Replaced ad-hoc manual checks with a structured alerting dashboard that gives management continuous ' +
      'visibility over service health and signals risk before it escalates into an incident.',
    tags: 'MicroStrategy, Excel, Microsoft Lists, Business Intelligence, Operations Management',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 2 ── Escalation Tracker ───────────────────────────────────────────────────
  {
    title: 'Automated Escalation Tracker',
    description:
      'A no-miss follow-up system built on SharePoint Lists and Power Automate for a B2B service desk at MEO. ' +
      'Critical tickets escalated by email are automatically enrolled in a checkpoint timer. If the incident manager ' +
      'does not log a status update within 4 hours, an alert fires regardless of any manual checkpoint previously set.\n\n' +
      'Eliminated missed SLA windows caused by overlooked escalations — moving from a manual, person-dependent ' +
      'process to a resilient, self-enforcing reminder loop.',
    tags: 'SharePoint, Power Automate, Microsoft 365, Process Automation',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 3 ── Continuous Improvement Manager ──────────────────────────────────────
  {
    title: 'Continuous Improvement Manager',
    description:
      'A full lifecycle management app (Power Apps + Microsoft Lists) for tracking operational improvements ' +
      'across a B2B service operation. Every initiative is logged with owner, milestones, and deadline. ' +
      'Any change — deadline shift, status update — is recorded in a tamper-proof audit log requiring ' +
      'justification and a responsible party.\n\n' +
      'Built with Microsoft Copilot in human-in-the-loop mode: requirements and iteration direction came ' +
      'from Marcos; Copilot generated execution steps; repeated prompt engineering drove the final design. ' +
      'Introduced accountability for delays that had previously been invisible to management.',
    tags: 'Power Apps, Microsoft Lists, Microsoft Copilot, Power Platform, AI-Assisted Development',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 4 ── Proposal Sizing Tool (no image by decision) ─────────────────────────
  {
    title: 'Proposal & Workforce Sizing Tool',
    description:
      'An automated proposal calculator (Power Apps + Microsoft Lists) that eliminates manual spreadsheet ' +
      'work from the B2B contract bidding process at MEO. Sales teams enter service requirements; ' +
      'Power Fx formulas calculate the required FTE headcount and cost breakdown automatically, ' +
      'producing a consistent and auditable sizing for every proposal submission.\n\n' +
      'Built with Microsoft Copilot and iterative prompt engineering across the Power Apps front-end ' +
      'and multi-table relational back-end.',
    tags: 'Power Apps, Microsoft Lists, Microsoft Copilot, Power Platform, AI-Assisted Development',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 6 ── Call Quality & Coaching System ──────────────────────────────────────
  {
    title: 'Call Quality & Coaching System',
    description:
      'A structured Quality Assurance platform for auditing service desk calls at MEO. Auditors score ' +
      'calls against weighted criteria; a failing result automatically triggers a Power Automate flow ' +
      'that assigns a coaching task to the training team, tracks its completion, and queues a re-audit ' +
      'to validate the improvement.\n\n' +
      'Closed the loop between quality audit, targeted coaching, and performance re-evaluation — ' +
      'with zero manual handoffs at any stage. Built with Power Apps, Microsoft Lists, and Microsoft Copilot.',
    tags: 'Power Apps, Power Automate, Microsoft Lists, Microsoft Copilot, QA Automation, AI-Assisted Development',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 7 ── Operations Quality Radar ────────────────────────────────────────────
  {
    title: 'Operations Quality Radar',
    description:
      'A live Power BI dashboard automatically fed by the Call Quality & Coaching System. Tracks ' +
      'call audit volumes, monthly quality evolution by agent, and KPI compliance rates across the operation.\n\n' +
      'When a KPI falls below baseline at month-end, the contract manager and responsible team receive ' +
      'an automatic alert — turning raw audit data into proactive management intelligence without ' +
      'any manual report generation.',
    tags: 'Power BI, Microsoft Lists, Business Intelligence, Dashboards, Automation',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 9 ── Consciências Elevadas ────────────────────────────────────────────────
  {
    title: 'Consciências Elevadas — AI Spiritual Platform',
    description:
      'A conversational AI platform built around historical and spiritual figures (Jesus Christ, ' +
      'the Buddha, and others). Each persona is grounded in a RAG system fed with the figure\'s ' +
      'complete works and biography — stored in a Supabase vector database with custom indexing ' +
      'for response latency.\n\n' +
      'Complex orchestration flows in n8n give each persona consistent voice and contextual recall. ' +
      'Built starting from Lovable, evolved via Claude Code; uses OpenRouter for LLM routing and ' +
      'Supabase MCPs for database communication. A beta audit surfaced and resolved security ' +
      'hardening gaps before public launch. Payment integration ready.',
    tags: 'RAG, n8n, Supabase, OpenRouter, Claude Code, Conversational AI, Vector DB, Lovable',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 10 ── MatemáticaRoyale ────────────────────────────────────────────────────
  {
    title: 'MatemáticaRoyale — Gamified Study App',
    description:
      'A gamified study app built for Lucas, who was preparing for a math exam but more motivated ' +
      'by Fortnite than textbooks. Photographed the study material; built a full Battle Royale-themed app ' +
      'with Claude Code in a single session: HUD with lives, V-Points, XP, a shop, and a recovery zone.\n\n' +
      'Students advance through mission-style levels — wrong answers cost lives, personal commitments ' +
      '(reading, limiting screen time) earn them back. All progress syncs to Firebase; the parent ' +
      'dashboard shows which topics need reinforcement and whether commitments were honored. ' +
      'A practical demonstration of AI-assisted rapid development and educational game design.',
    tags: 'HTML/CSS/JS, Three.js, Firebase, Claude Code, EdTech, Game Design',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 11 ── Cinematic 3D Site Builder ──────────────────────────────────────────
  {
    title: 'Cinematic 3D Portfolio Generator',
    description:
      'A full pipeline that converts a structured YAML brief into a cinematic, WebGL-powered portfolio site — ' +
      'complete with scroll-driven 3D animations, a hero image generated via AI (Nano Banana Pro on FAL.ai), ' +
      'and six AI-generated video clips (Seedance 2.0) displayed as a 240-frame parallax sequence on scroll.\n\n' +
      'The pipeline runs through 6 automated stages with QA via Playwright. The live output (published on ' +
      'GitHub Pages) benchmarks at Awwwards-level visual quality. Total AI media budget for this build: $32.98. ' +
      'Demonstrates generative AI pipeline design and automated web publishing.',
    tags: 'WebGL, Three.js, FAL.ai, Playwright, Claude Code, Generative AI, Video AI, GitHub Pages',
    link: 'https://mfouyer.github.io/portfolio-cinematico/',
    github: 'https://github.com/Mfouyer/portfolio-cinematico',
    highlighted: true,
  },

  // ── 12 ── Personal Portfolio (meta) ──────────────────────────────────────────
  {
    title: 'EF.dev — AI-Built Portfolio Suite',
    description:
      'Two production-grade sites built end-to-end with Claude Code as the AI pair-programmer:\n\n' +
      'This portfolio (React + Vite + TypeScript + PocketBase, trilingual PT/EN/ES, framer-motion ' +
      'animations, dynamic admin panel).\n\n' +
      'Juliana Ract Physio (juliana-fisio.pt) — a bilingual institutional site evolving into a ' +
      'micro-SaaS with patient management, appointment scheduling, and financial tracking. ' +
      'Demonstrates rapid full-stack delivery, CMS design, and i18n at the component level.',
    tags: 'React, Vite, TypeScript, PocketBase, Tailwind CSS, Claude Code, i18n, Framer Motion',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 14 ── AI Knowledge Framework (no image by decision) ──────────────────────
  {
    title: 'AI Knowledge Framework',
    description:
      'A 3-step process for absorbing new knowledge domains quickly and durably: ' +
      '(1) RAG ingestion or web scraping of the target material, ' +
      '(2) automatic mind-map generation in WiseMapping (live at mindmap.erik-lapadula.com) — ' +
      'all topics in a navigable visual structure, ' +
      '(3) AI-generated audio summary via NotebookLM for passive review.\n\n' +
      'Content enters once and surfaces as both a visual map and an on-demand podcast. ' +
      'Designed for continuous professional learning in fast-moving fields.',
    tags: 'RAG, WiseMapping, NotebookLM, Claude Code, Knowledge Management, Learning Systems',
    link: '',
    github: '',
    highlighted: true,
  },

  // ── 15 ── Social Content Automation (no image by decision) ───────────────────
  {
    title: 'Social Content Automation Pipeline',
    description:
      'An end-to-end content pipeline for a health & wellness creator (Juliana Ract, physiotherapist). ' +
      'Given a niche, it searches YouTube for currently viral content, generates a 10-video content ' +
      'calendar with full scripts, and creates branded static posts using the creator\'s visual identity ' +
      '— with images generated via the Gemini API.\n\n' +
      'Next roadmap step: script-to-video via HeyGen avatars. Built to run autonomously with minimal ' +
      'human intervention between ideation and Instagram-ready output.',
    tags: 'YouTube API, Gemini API, Claude Code, Instagram, Content Automation, AI Generation',
    link: '',
    github: '',
    highlighted: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function pbFetch(path, opts = {}) {
  const headers = { ...(opts.headers || {}) };
  // Only set JSON content-type when body is a plain string (not FormData)
  if (opts.body && typeof opts.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${PB_URL}${path}`, { ...opts, headers });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`PocketBase ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function authenticate() {
  const data = await pbFetch('/api/collections/_superusers/auth-with-password', {
    method: 'POST',
    body: JSON.stringify({ identity: PB_EMAIL, password: PB_PASSWORD }),
  });
  return data.token;
}

function toFormData(project) {
  const fd = new FormData();
  for (const [key, val] of Object.entries(project)) {
    if (val !== undefined && val !== null && val !== '') {
      fd.append(key, String(val));
    }
  }
  return fd;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (DRY_RUN) {
    console.log('DRY RUN — would create the following projects:\n');
    PROJECTS.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title}`);
      console.log(`   Tags: ${p.tags}`);
      console.log(`   Desc: ${p.description.slice(0, 80)}...`);
      console.log();
    });
    return;
  }

  console.log('Authenticating with PocketBase...');
  const token = await authenticate();
  console.log('Authenticated.\n');

  if (WIPE) {
    console.log('--wipe: deleting all existing project records...');
    const existing = await pbFetch('/api/collections/projects/records?perPage=200', {
      headers: { Authorization: token },
    });
    for (const rec of existing.items || []) {
      await pbFetch(`/api/collections/projects/records/${rec.id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      console.log(`  Deleted: ${rec.title}`);
    }
    console.log();
  }

  console.log(`Creating ${PROJECTS.length} project records...\n`);
  for (const project of PROJECTS) {
    try {
      const rec = await pbFetch('/api/collections/projects/records', {
        method: 'POST',
        headers: { Authorization: token },
        body: toFormData(project),
      });
      console.log(`✓ Created: ${project.title} (${rec.id})`);
    } catch (err) {
      console.error(`✗ Failed: ${project.title} — ${err.message}`);
    }
  }

  console.log('\nDone.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
