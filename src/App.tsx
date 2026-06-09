import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, ArrowDown, Github, Linkedin, Mail,
  ExternalLink, Send, Code2, FolderOpen, LayoutGrid, icons,
} from 'lucide-react';
import { pb } from './lib/pocketbase';
import { openClaudeDiagram } from './components/OpenClaudeDiagram';
import HeroMotion from './components/HeroMotion';
import LangSwitcher from './components/LangSwitcher';
import { useLanguage } from './contexts/LanguageContext';
import './App.css';
import './styles/architect.css';

/* ════════════════════════════════════════════════════════════
   CONTEÚDO ESTÁTICO controlado por i18n (PT/EN/ES).
   Skills, Projetos e o formulário de contacto são DINÂMICOS,
   vindos do PocketBase / gravando em 'messages'.
   ════════════════════════════════════════════════════════════ */

// Stats: números fixos, labels traduzidos por chave.
const HERO_STATS = [
  { number: '15+', labelKey: 'hero.stat1.label' },
  { number: '10', labelKey: 'hero.stat2.label' },
  { number: '24/7', labelKey: 'hero.stat3.label' },
];

const ABOUT_ACTS = [
  { labelKey: 'about.act1.label', titleKey: 'about.act1.h3', bodyKey: 'about.act1.p' },
  { labelKey: 'about.act2.label', titleKey: 'about.act2.h3', bodyKey: 'about.act2.p' },
  { labelKey: 'about.act3.label', titleKey: 'about.act3.h3', bodyKey: 'about.act3.p' },
];

const FLAGSHIP_TAG_KEYS = [
  'oc.tag1', 'oc.tag2', 'oc.tag3', 'oc.tag4', 'oc.tag5', 'oc.tag6',
];

const FLAGSHIP_DETAILS = [
  { icon: '01', titleKey: 'oc.card1.h4', bodyKey: 'oc.card1.p' },
  { icon: '02', titleKey: 'oc.card2.h4', bodyKey: 'oc.card2.p' },
  { icon: '03', titleKey: 'oc.card3.h4', bodyKey: 'oc.card3.p' },
];

// Certificações e roadmap: agora data-driven via PocketBase (collections
// 'certifications' e 'learning_roadmap'). Os arrays abaixo são apenas FALLBACK
// para o caso de a collection vir vazia / o backend não responder — assim a
// secção nunca aparece vazia. O status (earned/studying/planned) reaproveita as
// chaves i18n 'cred.status.*'; a descrição é multilingue (desc_pt/en/es).
const FALLBACK_CERTIFICATIONS = [
  { id: 'fb-ai900', tag: 'MS', title: 'Azure AI Fundamentals (AI-900)', status: 'earned', issuer: 'Microsoft', category: 'ai',
    desc_pt: 'Microsoft — Fundamentos de IA na Azure', desc_en: 'Microsoft — Azure AI fundamentals', desc_es: 'Microsoft — Fundamentos de IA en Azure' },
  { id: 'fb-vand', tag: 'V', title: 'Agentic AI and AI Agents for Leaders', status: 'earned', issuer: 'Vanderbilt University', category: 'ai',
    desc_pt: 'Vanderbilt University — Agentic AI, governança de IA e liderança', desc_en: 'Vanderbilt University — Agentic AI, AI governance and leadership', desc_es: 'Vanderbilt University — Agentic AI, gobernanza de IA y liderazgo' },
  { id: 'fb-ai103', tag: 'MS', title: 'AI-103: Azure AI App and Agent Developer Associate', status: 'studying', issuer: 'Microsoft', category: 'ai',
    desc_pt: 'Microsoft — Sucessora da AI-102: Python + Azure AI Foundry e multi-agentes', desc_en: 'Microsoft — Successor to AI-102: Python + Azure AI Foundry and multi-agent systems', desc_es: 'Microsoft — Sucesora de la AI-102: Python + Azure AI Foundry y multiagentes' },
  { id: 'fb-psm', tag: 'PSM', title: 'Professional Scrum Master (PSM)', status: 'earned', issuer: 'Scrum.org', category: 'process',
    desc_pt: 'Scrum.org — Metodologia ágil e facilitação de equipas', desc_en: 'Scrum.org — Agile methodology and team facilitation', desc_es: 'Scrum.org — Metodología ágil y facilitación de equipos' },
];

const FALLBACK_ROADMAP = [
  { id: 'fr-ai103', period: "Q3 '26", cert: 'AI-103 — Azure AI App & Agent Developer', org: 'Microsoft' },
  { id: 'fr-ab730', period: "Q3 '26", cert: 'AB-730 / AB-731 — Agentic AI', org: 'LevelUp (Microsoft)' },
  { id: 'fr-az104', period: "Q4 '26", cert: 'AZ-104 — Azure Administrator', org: 'Microsoft' },
  { id: 'fr-aigp', period: "Q4 '26", cert: 'AIGP — AI Governance Professional', org: 'IAPP' },
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

// Efeito de "digitação" da tagline do hero — reinicia quando o idioma muda.
function useTypedText(phrases: string[]): string {
  const [text, setText] = React.useState('');
  React.useEffect(() => {
    setText('');
    let phraseIdx = 0, charIdx = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = phrases[phraseIdx];
      if (!current) return;
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
  const { t, typed: typedPhrases } = useLanguage();

  const [skills, setSkills] = React.useState<any[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [certifications, setCertifications] = React.useState<any[]>([]);
  const [roadmap, setRoadmap] = React.useState<any[]>([]);
  const [navOpen, setNavOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const typed = useTypedText(typedPhrases);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await pb.collection('skills').getFullList({ filter: 'highlighted = true', requestKey: null });
        const projectsData = await pb.collection('projects').getFullList({ filter: 'highlighted = true', requestKey: null });
        const certsData = await pb.collection('certifications').getFullList({ sort: 'sort', requestKey: null });
        const roadmapData = await pb.collection('learning_roadmap').getFullList({ sort: 'sort', requestKey: null });
        setSkills(skillsData);
        setProjects(projectsData);
        setCertifications(certsData);
        setRoadmap(roadmapData);
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
      alert(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="architect-page">

      {/* ─── Navigation ─── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">EF<span>.</span>dev</div>
        <div className="nav-right">
          <ul className={`nav-links${navOpen ? ' open' : ''}`}>
            <li><a href="#about" onClick={closeNav}>{t('nav.about')}</a></li>
            <li><a href="#openclaude" onClick={closeNav}>{t('nav.openclaude')}</a></li>
            <li><a href="#projects" onClick={closeNav}>{t('nav.projects')}</a></li>
            <li><a href="#capabilities" onClick={closeNav}>{t('nav.capabilities')}</a></li>
            <li><a href="#credentials" onClick={closeNav}>{t('nav.credentials')}</a></li>
            <li><a href="#contact" className="nav-cta" onClick={closeNav}>{t('nav.cta')}</a></li>
            <li className="nav-divider" aria-hidden="true"></li>
            <li>
              <Link to="/admin" className="nav-admin" title="Painel Admin" onClick={closeNav}>
                <Shield size={16} />
              </Link>
            </li>
          </ul>
          <LangSwitcher />
          <div className="nav-hamburger" onClick={() => setNavOpen(o => !o)}>
            <span></span><span></span><span></span>
          </div>
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
            <div className="hero-badge">{t('hero.badge')}</div>

            <h1 className="hero-title">
              {t('hero.title.line1')}<br />
              <span className="accent">{t('hero.title.accent')}</span>
            </h1>

            <p className="hero-tagline">
              {t('hero.tagline.prefix')} <span>{typed}</span><span className="typed-cursor"></span>
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <FolderOpen size={16} /> {t('hero.btn.projects')}
              </a>
              <a href="#capabilities" className="btn-secondary">
                <LayoutGrid size={16} /> {t('hero.btn.skills')}
              </a>
            </div>

            <div className="hero-meta">
              {HERO_STATS.map((s) => (
                <div className="hero-stat" key={s.labelKey}>
                  <span className="hero-stat-number">{s.number}</span>
                  <span className="hero-stat-label">{t(s.labelKey)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <span>{t('hero.scroll')}</span>
          <ArrowDown size={16} />
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── About ─── */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="placeholder-note">{t('about.photo.note')}</span>
              <div className="about-photo-placeholder">
                {PROFILE_PHOTO ? (
                  <img src={PROFILE_PHOTO} alt="Erik Fouyer" />
                ) : (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    <span>Erik Fouyer</span>
                    <span style={{ fontSize: '10px', color: 'var(--amber)', opacity: 0.6 }}>{t('about.photo.replace')}</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <span className="section-label">{t('about.label')}</span>
              <FadeUp><h2>{t('about.h2.line1')}<br />{t('about.h2.line2')}</h2></FadeUp>

              <div className="about-acts">
                {ABOUT_ACTS.map((act, i) => (
                  <FadeUp className="about-act" delay={0.1 * (i + 1)} key={act.labelKey}>
                    <div className="about-act-label">{t(act.labelKey)}</div>
                    <h3>{t(act.titleKey)}</h3>
                    <p>{t(act.bodyKey)}</p>
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
            <span className="section-label">{t('oc.label')}</span>
            <FadeUp><h2>{t('oc.h2.line1')}<br />{t('oc.h2.line2')}</h2></FadeUp>
            <FadeUp delay={0.1}>
              <p className="lead">{t('oc.lead')}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flagship-meta">
                {FLAGSHIP_TAG_KEYS.map((k) => <span className="flagship-tag" key={k}>{t(k)}</span>)}
              </div>
            </FadeUp>
          </div>

          <FadeUp>
            <div className="diagram-wrapper">
              <div className="diagram-title"><span>{t('oc.diagram.title')}</span></div>
              <div className="diagram-svg-wrap" dangerouslySetInnerHTML={{ __html: openClaudeDiagram }} />
            </div>
          </FadeUp>

          <div className="flagship-details">
            {FLAGSHIP_DETAILS.map((d, i) => (
              <FadeUp className="flagship-detail-card" delay={0.1 * i} key={d.icon}>
                <div className="card-icon">{d.icon}</div>
                <h4>{t(d.titleKey)}</h4>
                <p>{t(d.bodyKey)}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── Other Projects (DINÂMICO — PocketBase) ─── */}
      <section id="projects">
        <div className="container">
          <span className="section-label">{t('proj.label')}</span>
          <FadeUp><h2>{t('proj.h2.line1')}<br />{t('proj.h2.line2')}</h2></FadeUp>
          <FadeUp delay={0.1}>
            <p className="lead">{t('proj.lead')}</p>
          </FadeUp>

          <div className="projects-grid">
            {projects.length > 0 ? projects.map((project, i) => {
              const isLive = !!project.link;
              const tags = project.tags ? String(project.tags).split(',').map((t: string) => t.trim()).filter(Boolean) : [];
              return (
                <FadeUp className="project-card" delay={0.1 * (i % 3)} key={project.id || i}>
                  <div className="project-status">
                    <span className={`status-dot ${isLive ? 'live' : 'wip'}`}></span>
                    <span>{isLive ? t('proj.status.live') : t('proj.status.soon')}</span>
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
                {t('proj.empty')}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ─── Capabilities (DINÂMICO — skills do PocketBase) ─── */}
      <section id="capabilities">
        <div className="container">
          <span className="section-label">{t('cap.label')}</span>
          <FadeUp><h2>{t('cap.h2')}</h2></FadeUp>
          <FadeUp delay={0.1}>
            <p className="lead">{t('cap.lead')}</p>
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
                  {t('cap.empty')}
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
          <span className="section-label">{t('cred.label')}</span>
          <FadeUp><h2>{t('cred.h2.line1')}<br />{t('cred.h2.line2')}</h2></FadeUp>

          <div className="credentials-split">
            <div className="cred-section">
              <h3>{t('cred.certs.title')}</h3>
              {(() => {
                const certs = certifications.length > 0 ? certifications : FALLBACK_CERTIFICATIONS;
                const groups = [
                  { key: 'ai', titleKey: 'cred.certs.groupAi', items: certs.filter((c) => c.category === 'ai') },
                  { key: 'other', titleKey: 'cred.certs.groupOther', items: certs.filter((c) => c.category !== 'ai') },
                ];
                let idx = 0;
                return groups
                  .filter((g) => g.items.length > 0)
                  .map((g) => (
                    <div className="cred-group" key={g.key}>
                      <h4 className="cred-group-title">{t(g.titleKey)}</h4>
                      <div className="cred-list">
                        {g.items.map((c) => {
                          const org = (c.issuer || '').toUpperCase();
                          // Os nomes oficiais de alguns exames já embebem o órgão
                          // (ex.: "AB-730: MICROSOFT - ..."); nesses casos não
                          // duplicamos o prefixo do issuer.
                          const orgInTitle = org && (c.title || '').toUpperCase().includes(org);
                          return (
                            <FadeUp className="cred-item" delay={0.05 * idx++} key={c.id}>
                              <div className="cred-icon">{c.tag}</div>
                              <div className="cred-body">
                                <strong>
                                  {org && !orgInTitle && (
                                    <><span className="cred-org">{org}</span>{' - '}</>
                                  )}
                                  {c.title}{' '}
                                  <span className={`cred-status ${c.status}`}>{t(`cred.status.${c.status}`)}</span>
                                </strong>
                                {/* description field kept in DB but not rendered */}
                              </div>
                            </FadeUp>
                          );
                        })}
                      </div>
                    </div>
                  ));
              })()}
            </div>

            <div className="cred-section">
              <h3>{t('cred.roadmap.title')}</h3>
              <div className="roadmap-list">
                {(roadmap.length > 0 ? roadmap : FALLBACK_ROADMAP).map((r, i) => (
                  <FadeUp className="roadmap-item" delay={0.1 * i} key={r.id}>
                    <span className="roadmap-q">{r.period}</span>
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
            <span className="section-label" style={{ textAlign: 'center' }}>{t('contact.label')}</span>
            <FadeUp><h2>{t('contact.h2.line1')}<br />{t('contact.h2.line2')}</h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>{t('contact.p')}</p>
            </FadeUp>

            {submitted ? (
              <div className="contact-success">
                <h3>{t('contact.success.title')}</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  {t('contact.success.p')}
                </p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>{t('contact.success.again')}</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input
                  type="text" placeholder={t('contact.field.name')} required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email" placeholder={t('contact.field.email')} required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <textarea
                  rows={4} placeholder={t('contact.field.message')} required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? t('contact.btn.sending') : t('contact.btn.send')} <Send size={16} />
                </button>
              </form>
            )}

            <div className="contact-divider">{t('contact.divider')}</div>

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
            <div className="footer-logo">Erik Fouyer<span>{t('footer.logo.suffix')}</span></div>
            <ul className="footer-links">
              <li><a href="#" title="LinkedIn"><Linkedin size={15} /> LinkedIn</a></li>
              <li><a href="#" title="GitHub"><Github size={15} /> GitHub</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} title="Email"><Mail size={15} /> Email</a></li>
            </ul>
            <div className="footer-copy">{t('footer.copy')}</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
