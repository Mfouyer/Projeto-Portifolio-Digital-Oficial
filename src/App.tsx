import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Calendar, Clock, ArrowDown, Github, Linkedin, Mail,
  ExternalLink, Send, Code2, icons,
} from 'lucide-react';
import { pb } from './lib/pocketbase';
import { openClaudeDiagram } from './components/OpenClaudeDiagram';
import HeroMotion from './components/HeroMotion';
import './App.css';
import './styles/architect.css';

/* ════════════════════════════════════════════════════════════
   CONTEÚDO ESTÁTICO — edite estes blocos livremente.
   (Skills, Projetos e o formulário de contato são DINÂMICOS,
    vindos do PocketBase / gravando em 'messages'.)
   ════════════════════════════════════════════════════════════ */

const TYPED_PHRASES = [
  'multi-agent AI systems in production.',
  'AI governance frameworks that work.',
  'automation systems that run 24/7.',
  'AI operations, not just AI demos.',
];

const HERO_STATS = [
  { number: '15+', label: 'Years in enterprise ops' },
  { number: '6', label: 'AI agents in production' },
  { number: '24/7', label: 'Systems running autonomously' },
];

const ABOUT_ACTS = [
  {
    label: 'Act I — The Operator',
    title: 'Built for scale from day one.',
    body: "Over 15 years at MEO — one of Portugal's largest telecoms — I ran Scrum governance and enterprise-scale service operations. I know what breaks at volume, what the business actually needs, and how to get cross-functional teams moving in the same direction. That operational discipline is the foundation everything else sits on.",
  },
  {
    label: 'Act II — The Builder',
    title: 'From using AI tools to running AI systems.',
    body: "I didn't just start using AI — I built an infrastructure for it. OpenClaude is my own multi-agent AI system: six specialised agents coordinated by an orchestration layer, running 24/7 on a self-hosted server. Real production. Real orchestration. Real problems solved. That shift from consumer to architect changed how I see what's possible.",
  },
  {
    label: 'Act III — The Consultant',
    title: 'Ready to bring this playbook to your organisation.',
    body: "I'm now available to Australian companies looking to move from AI experiments to AI operations. I help teams design agent architectures, implement governance frameworks, and build systems that don't just demo well — they run reliably in production.",
  },
];

const FLAGSHIP_TAGS = [
  'Multi-agent orchestration', 'Self-hosted', '24/7 production',
  'Claude API', 'Telegram integration', 'Persistent memory',
];

const FLAGSHIP_DETAILS = [
  { icon: '01', title: 'Specialised Agents, Clear Roles', body: 'Each agent owns a domain — infrastructure, engineering, strategy, psychology, intelligence. No blurring of responsibilities. Every agent knows its boundary and hands off correctly.' },
  { icon: '02', title: 'Persistent Memory Layer', body: 'Agents maintain context across sessions via structured file-based memory. Decisions made in one conversation inform the next — the system gets smarter over time, not just faster.' },
  { icon: '03', title: 'Production-Grade, Not a Demo', body: 'Running on a self-hosted Ubuntu server with Coolify orchestration, Tailscale access, real integrations (Telegram, GitHub, Obsidian) and daily operational use — not a proof of concept.' },
];

const CERTIFICATIONS = [
  { tag: 'PSM', title: 'Professional Scrum Master I', status: 'earned', statusLabel: 'Earned', desc: 'Scrum.org — Agile methodology and team facilitation' },
  { tag: 'AB', title: 'IIBA CBAP Prerequisites (AB-730/731)', status: 'studying', statusLabel: 'Studying', desc: 'Business Analysis — requirements, stakeholder management' },
  { tag: 'AI', title: 'AI-102: Azure AI Engineer Associate', status: 'planned', statusLabel: 'Planned', desc: 'Microsoft — AI solution design and implementation' },
];

const ROADMAP = [
  { q: "Q3 '26", cert: 'GSDC AI Governance Certification', org: 'GSDC' },
  { q: "Q3 '26", cert: 'Microsoft AI-102 Azure AI Engineer', org: 'Microsoft' },
  { q: "Q4 '26", cert: 'Oxford AI Programme', org: 'Oxford Said' },
  { q: "Q4 '26", cert: 'NVIDIA Deep Learning Institute', org: 'NVIDIA' },
  { q: '2027', cert: 'IIBA CBAP — Business Analysis', org: 'IIBA' },
];

const CONTACT_EMAIL = 'marcos.fouyer@gmail.com';

// Foto do "About": coloque o caminho da imagem (ex.: '/marcos.jpg' em public/,
// ou importe de ./assets). Deixe '' para manter o placeholder.
const PROFILE_PHOTO = '';

/* ════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════ */

// Animação de entrada no scroll (substitui o IntersectionObserver do HTML).
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

// Efeito de "digitação" da tagline do hero.
function useTypedText(phrases: string[]): string {
  const [text, setText] = React.useState('');
  React.useEffect(() => {
    let phraseIdx = 0, charIdx = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) { deleting = true; timer = setTimeout(tick, 2400); return; }
        timer = setTimeout(tick, 42);
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; timer = setTimeout(tick, 320); return; }
        timer = setTimeout(tick, 22);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, [phrases]);
  return text;
}

/* ════════════════════════════════════════════════════════════
   APP
   ════════════════════════════════════════════════════════════ */

const App: React.FC = () => {
  const [skills, setSkills] = React.useState<any[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [navOpen, setNavOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const typed = useTypedText(TYPED_PHRASES);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await pb.collection('skills').getFullList({ filter: 'highlighted = true', requestKey: null });
        const projectsData = await pb.collection('projects').getFullList({ filter: 'highlighted = true', requestKey: null });
        setSkills(skillsData);
        setProjects(projectsData);
      } catch (error: any) {
        if (error?.isAbort) return;
        console.error('Error fetching portfolio data:', error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeNav = () => setNavOpen(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await pb.collection('messages').create(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="architect-page">

      {/* ─── Navigation ─── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">MF<span>.</span>dev</div>
        <ul className={`nav-links${navOpen ? ' open' : ''}`}>
          <li><a href="#about" onClick={closeNav}>About</a></li>
          <li><a href="#openclaude" onClick={closeNav}>OpenClaude</a></li>
          <li><a href="#projects" onClick={closeNav}>Projects</a></li>
          <li><a href="#capabilities" onClick={closeNav}>Capabilities</a></li>
          <li><a href="#credentials" onClick={closeNav}>Credentials</a></li>
          <li><a href="#contact" className="nav-cta" onClick={closeNav}>Book a Call</a></li>
          <li className="nav-divider" aria-hidden="true"></li>
          <li>
            <Link to="/admin" className="nav-admin" title="Painel Admin" onClick={closeNav}>
              <Shield size={16} />
            </Link>
          </li>
        </ul>
        <div className="nav-hamburger" onClick={() => setNavOpen(o => !o)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section id="hero">
        <HeroMotion />
        <div className="hero-glow"></div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-badge">Available for consulting — Australia</div>

            <h1 className="hero-title">
              AI Systems<br />
              <span className="accent">Architect.</span>
            </h1>

            <p className="hero-tagline">
              I build, govern and operate <span>{typed}</span><span className="typed-cursor"></span>
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                <Calendar size={16} /> Book a 30-min AI Consultation
              </a>
              <a href="#openclaude" className="btn-secondary">
                <Clock size={16} /> See OpenClaude
              </a>
            </div>

            <div className="hero-meta">
              {HERO_STATS.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <span className="hero-stat-number">{s.number}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <span>scroll</span>
          <ArrowDown size={16} />
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── About ─── */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="placeholder-note">Placeholder — add your photo</span>
              <div className="about-photo-placeholder">
                {PROFILE_PHOTO ? (
                  <img src={PROFILE_PHOTO} alt="Marcos Fouyer" />
                ) : (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    <span>Marcos Fouyer</span>
                    <span style={{ fontSize: '10px', color: 'var(--amber)', opacity: 0.6 }}>Defina PROFILE_PHOTO no topo do App.tsx</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <span className="section-label">About</span>
              <FadeUp><h2>Three acts.<br />One clear direction.</h2></FadeUp>

              <div className="about-acts">
                {ABOUT_ACTS.map((act, i) => (
                  <FadeUp className="about-act" delay={0.1 * (i + 1)} key={act.label}>
                    <div className="about-act-label">{act.label}</div>
                    <h3>{act.title}</h3>
                    <p>{act.body}</p>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── OpenClaude Flagship ─── */}
      <section id="openclaude">
        <div className="container">
          <div className="flagship-header">
            <span className="section-label">Flagship Project</span>
            <FadeUp><h2>OpenClaude — A Multi-Agent<br />AI System in Production</h2></FadeUp>
            <FadeUp delay={0.1}>
              <p className="lead">
                A fully self-hosted orchestration framework built from scratch. Six specialised AI agents, a persistent
                memory layer, multi-channel communication, and autonomous task execution — running continuously on a
                single Ubuntu server.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flagship-meta">
                {FLAGSHIP_TAGS.map((t) => <span className="flagship-tag" key={t}>{t}</span>)}
              </div>
            </FadeUp>
          </div>

          <FadeUp>
            <div className="diagram-wrapper">
              <div className="diagram-title"><span>OpenClaude — System Architecture</span></div>
              <div className="diagram-svg-wrap" dangerouslySetInnerHTML={{ __html: openClaudeDiagram }} />
            </div>
          </FadeUp>

          <div className="flagship-details">
            {FLAGSHIP_DETAILS.map((d, i) => (
              <FadeUp className="flagship-detail-card" delay={0.1 * i} key={d.icon}>
                <div className="card-icon">{d.icon}</div>
                <h4>{d.title}</h4>
                <p>{d.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── Other Projects (DINÂMICO — PocketBase) ─── */}
      <section id="projects">
        <div className="container">
          <span className="section-label">Other Projects</span>
          <FadeUp><h2>Automations, tools<br />and applied experiments.</h2></FadeUp>
          <FadeUp delay={0.1}>
            <p className="lead">Things built outside of OpenClaude — tools for real problems, automations that run daily,
              and ideas turned into working systems.</p>
          </FadeUp>

          <div className="projects-grid">
            {projects.length > 0 ? projects.map((project, i) => {
              const isLive = !!project.link;
              const tags = project.tags ? String(project.tags).split(',').map((t: string) => t.trim()).filter(Boolean) : [];
              return (
                <FadeUp className="project-card" delay={0.1 * (i % 3)} key={project.id || i}>
                  <div className="project-status">
                    <span className={`status-dot ${isLive ? 'live' : 'wip'}`}></span>
                    <span>{isLive ? 'Live' : 'Em desenvolvimento'}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {tags.length > 0 && (
                    <div className="project-tags">
                      {tags.map((tag: string) => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                  )}
                  {(project.link || project.github) && (
                    <div className="project-links">
                      {project.link && <a href={project.link} target="_blank" rel="noreferrer" title="Abrir projeto"><ExternalLink size={18} /></a>}
                      {project.github && <a href={project.github} target="_blank" rel="noreferrer" title="Ver no GitHub"><Github size={18} /></a>}
                    </div>
                  )}
                </FadeUp>
              );
            }) : (
              <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
                Nenhum projeto destacado no momento. Adicione projetos pelo painel admin e marque “Destacar”.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── Capabilities (DINÂMICO — skills do PocketBase) ─── */}
      <section id="capabilities">
        <div className="container">
          <span className="section-label">What I Deliver</span>
          <FadeUp><h2>Capabilities — in business language.</h2></FadeUp>
          <FadeUp delay={0.1}>
            <p className="lead">Not a list of tools. A description of the problems I help organisations solve.</p>
          </FadeUp>

          <div className="capabilities-grid">
            {skills.length > 0 ? skills.map((skill, i) => {
              const IconComp = (icons as any)[skill.icon] || Code2;
              return (
                <div className="capability-item" key={skill.id || i}>
                  <div className="capability-head">
                    <span className="capability-number">{String(i + 1).padStart(2, '0')} —</span>
                    <span className="capability-icon"><IconComp size={18} /></span>
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </div>
              );
            }) : (
              <div className="capability-item" style={{ gridColumn: '1 / -1' }}>
                <p style={{ color: 'var(--text-muted)' }}>
                  Nenhuma especialidade destacada. Adicione skills pelo painel admin e marque “Destacar”.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── Credentials ─── */}
      <section id="credentials">
        <div className="container">
          <span className="section-label">Credentials</span>
          <FadeUp><h2>Earned, studying,<br />and on the roadmap.</h2></FadeUp>

          <div className="credentials-split">
            <div className="cred-section">
              <h3>Certifications</h3>
              <div className="cred-list">
                {CERTIFICATIONS.map((c, i) => (
                  <FadeUp className="cred-item" delay={0.1 * i} key={c.title}>
                    <div className="cred-icon">{c.tag}</div>
                    <div className="cred-body">
                      <strong>{c.title} <span className={`cred-status ${c.status}`}>{c.statusLabel}</span></strong>
                      <span>{c.desc}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            <div className="cred-section">
              <h3>Learning Roadmap</h3>
              <div className="roadmap-list">
                {ROADMAP.map((r, i) => (
                  <FadeUp className="roadmap-item" delay={0.1 * i} key={r.cert}>
                    <span className="roadmap-q">{r.q}</span>
                    <span className="roadmap-cert">{r.cert}</span>
                    <span className="roadmap-org">{r.org}</span>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── Contact (formulário grava em 'messages') ─── */}
      <section id="contact">
        <div className="container">
          <div className="contact-inner">
            <span className="section-label" style={{ textAlign: 'center' }}>Get in touch</span>
            <FadeUp><h2>Ready to talk about<br />your AI roadmap?</h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>I work with Australian companies that want to move from AI curiosity to AI operations.
                A 30-minute conversation is enough to know if there's a fit.</p>
            </FadeUp>

            {submitted ? (
              <div className="contact-success">
                <h3>Mensagem enviada ✦</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Obrigado pelo contato — vou responder o mais breve possível.
                </p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>Enviar outra mensagem</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input
                  type="text" placeholder="Your name" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email" placeholder="Your email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <textarea
                  rows={4} placeholder="Tell me about your project or AI challenge" required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? 'Sending…' : 'Send message'} <Send size={16} />
                </button>
              </form>
            )}

            <div className="contact-divider">or reach out directly</div>

            <p className="contact-email">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">Marcos Fouyer<span> — AI Systems Architect</span></div>
            <ul className="footer-links">
              <li><a href="#" title="LinkedIn"><Linkedin size={15} /> LinkedIn</a></li>
              <li><a href="#" title="GitHub"><Github size={15} /> GitHub</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} title="Email"><Mail size={15} /> Email</a></li>
            </ul>
            <div className="footer-copy">Built with intention — Lisbon, 2026</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
