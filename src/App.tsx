import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import profilePhoto from './assets/marcos-fouyer.jpg';
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

// Certificações: agora data-driven via PocketBase (collection 'certifications').
// O array abaixo é apenas FALLBACK para o caso de a collection vir vazia /
// o backend não responder — assim a secção nunca aparece vazia.
// O status (earned/studying/planned) reaproveita as chaves i18n 'cred.status.*';
// a descrição é multilingue (desc_pt/en/es).
const FALLBACK_CERTIFICATIONS = [
  { id: 'fb-ai900', tag: 'MS', title: 'Azure AI Fundamentals (AI-900)', status: 'earned', issuer: 'Microsoft', category: 'ai',
    desc_pt: 'Microsoft — Fundamentos de IA na Azure', desc_en: 'Microsoft — Azure AI fundamentals', desc_es: 'Microsoft — Fundamentos de IA en Azure' },
  { id: 'fb-ab730', tag: 'MS', title: 'AI Business Professional (AB-730)', status: 'earned', issuer: 'LevelUp (Microsoft)', category: 'ai',
    desc_pt: 'LevelUp/Microsoft — IA aplicada a negócios', desc_en: 'LevelUp/Microsoft — AI applied to business', desc_es: 'LevelUp/Microsoft — IA aplicada a negocios' },
  { id: 'fb-ab731', tag: 'MS', title: 'AI Transformation Leader (AB-731)', status: 'earned', issuer: 'LevelUp (Microsoft)', category: 'ai',
    desc_pt: 'LevelUp/Microsoft — Liderança de transformação com IA', desc_en: 'LevelUp/Microsoft — AI transformation leadership', desc_es: 'LevelUp/Microsoft — Liderazgo de transformación con IA' },
  { id: 'fb-vand', tag: 'V', title: 'Agentic AI and AI Agents for Leaders', status: 'earned', issuer: 'Vanderbilt University', category: 'ai',
    desc_pt: 'Vanderbilt University — Agentic AI, governança de IA e liderança', desc_en: 'Vanderbilt University — Agentic AI, AI governance and leadership', desc_es: 'Vanderbilt University — Agentic AI, gobernanza de IA y liderazgo' },
  { id: 'fb-ai103', tag: 'MS', title: 'AI-103: Azure AI App and Agent Developer Associate', status: 'studying', issuer: 'Microsoft', category: 'ai',
    desc_pt: 'Microsoft — Sucessora da AI-102: Python + Azure AI Foundry e multi-agentes', desc_en: 'Microsoft — Successor to AI-102: Python + Azure AI Foundry and multi-agent systems', desc_es: 'Microsoft — Sucesora de la AI-102: Python + Azure AI Foundry y multiagentes' },
  { id: 'fb-psm', tag: 'PSM', title: 'Professional Scrum Master (PSM)', status: 'earned', issuer: 'Scrum.org', category: 'process',
    desc_pt: 'Scrum.org — Metodologia ágil e facilitação de equipas', desc_en: 'Scrum.org — Agile methodology and team facilitation', desc_es: 'Scrum.org — Metodología ágil y facilitación de equipos' },
];


const CONTACT_EMAIL = 'marcos.fouyer@gmail.com';

// Foto do "About": coloque o caminho da imagem (ex.: '/marcos.jpg' em public/,
// ou importe de ./assets). Deixe '' para manter o placeholder.
const PROFILE_PHOTO = profilePhoto;

/* ════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════ */

// Lightweight markdown renderer for project descriptions.
// Handles: **Bold headings**, - bullet lists, plain paragraphs.
const MarkdownContent: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const blocks = text.split(/\n\n+/);
  return (
    <div className={`md-content ${className}`}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        // Bold heading: **Title** (alone on the block or first line)
        const headingMatch = trimmed.match(/^\*\*(.+?)\*\*\s*$/);
        if (headingMatch) {
          return <p key={i} className="md-heading"><strong>{headingMatch[1]}</strong></p>;
        }
        // Bullet list: lines starting with "- "
        const lines = trimmed.split('\n');
        if (lines.every(l => l.trim().startsWith('- '))) {
          return (
            <ul key={i} className="md-list">
              {lines.map((l, j) => <li key={j}>{l.trim().slice(2)}</li>)}
            </ul>
          );
        }
        // Mixed block with a heading + bullets (e.g. "**Title**\n- item\n- item")
        if (lines[0].match(/^\*\*(.+?)\*\*$/) && lines.slice(1).some(l => l.trim().startsWith('- '))) {
          const headText = lines[0].match(/^\*\*(.+?)\*\*$/)![1];
          const rest = lines.slice(1);
          return (
            <React.Fragment key={i}>
              <p className="md-heading"><strong>{headText}</strong></p>
              {rest.some(l => l.trim().startsWith('- ')) && (
                <ul className="md-list">
                  {rest.filter(l => l.trim().startsWith('- ')).map((l, j) => <li key={j}>{l.trim().slice(2)}</li>)}
                </ul>
              )}
              {rest.filter(l => !l.trim().startsWith('- ') && l.trim()).map((l, j) => (
                <p key={`t${j}`}>{l}</p>
              ))}
            </React.Fragment>
          );
        }
        return <p key={i}>{trimmed}</p>;
      })}
    </div>
  );
};

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
  const { t, typed: typedPhrases, lang } = useLanguage();

  const [skills, setSkills] = React.useState<any[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [certifications, setCertifications] = React.useState<any[]>([]);
  const [navOpen, setNavOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const [expandedId, setExpandedId] = React.useState<string | null>(null);

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
        setSkills(skillsData);
        setProjects(projectsData);
        setCertifications(certsData);
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
                  <img src={PROFILE_PHOTO} alt="Marcos Fouyer" />
                ) : (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    <span>Marcos Fouyer</span>
                    <span style={{ fontSize: '10px', color: 'var(--amber)', opacity: 0.6 }}>{t('about.photo.replace')}</span>
                  </>
                )}
              </div>

              {/* ─ Credenciais ─ coladas por baixo da foto, dentro da coluna esquerda ─ */}
              <div id="credentials" className="about-credentials about-credentials--below-grid">
                <span className="section-label">{t('cred.label')}</span>
                <FadeUp><h2 className="about-cred-h2">{t('cred.h2.line1')}<br />{t('cred.h2.line2')}</h2></FadeUp>

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
                                  </div>
                                </FadeUp>
                              );
                            })}
                          </div>
                        </div>
                      ));
                  })()}
                </div>
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

                <FadeUp className="about-act" delay={0.4}>
                  <h3>{t('about.quals.h3')}</h3>
                  <p>{t('about.quals.p')}</p>
                </FadeUp>
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
              const tags = project.tags ? String(project.tags).split(',').map((tag: string) => tag.trim()).filter(Boolean) : [];
              const title = project[`title_${lang}`] || project.title_en || project.title || '';
              const teaser = project[`teaser_${lang}`] || project.teaser_en || '';
              const description = project[`description_${lang}`] || project.description_en || project.description || '';
              const isExpanded = expandedId === project.id;

              // Iniciais para o placeholder (máx 2 chars)
              const initials = title
                .split(/[\s\-_]+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((w: string) => w[0].toUpperCase())
                .join('');

              // Imagens de evidência
              const evidenceRaw = project.evidence;
              const evidenceFiles: string[] = Array.isArray(evidenceRaw) && evidenceRaw.length > 0
                ? evidenceRaw
                : [];
              const buildEvidenceUrl = (filename: string) =>
                `https://pb.mfouyer.com/api/files/${project.collectionId}/${project.id}/${filename}`;

              // URL da capa (campo cover_image — nome do ficheiro)
              const coverFile: string = project.cover_image || '';
              const coverUrl = coverFile
                ? `https://pb.mfouyer.com/api/files/${project.collectionId}/${project.id}/${coverFile}`
                : '';

              // Paleta de gradientes para o placeholder — distribuída por índice
              const PLACEHOLDERS = [
                'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                'linear-gradient(135deg, #1a1206 0%, #2d1f00 50%, #3d2800 100%)',
                'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)',
                'linear-gradient(135deg, #0a0a1a 0%, #111130 50%, #1a1a40 100%)',
                'linear-gradient(135deg, #0f1a0a 0%, #162310 50%, #1c2d14 100%)',
              ];
              const gradientBg = PLACEHOLDERS[i % PLACEHOLDERS.length];

              return (
                <FadeUp
                  className={`project-card project-card--redesign${isExpanded ? ' project-card--expanded' : ''}`}
                  delay={0.1 * (i % 3)}
                  key={project.id || i}
                >
                  {/* ── Cabeçalho clicável (capa + nome + teaser) ── */}
                  <div
                    className="project-card__header"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setExpandedId(isExpanded ? null : project.id)}
                    aria-expanded={isExpanded}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Capa ou placeholder */}
                    <div className="project-card__cover">
                      {coverUrl ? (
                        <img src={coverUrl} alt={title} className="project-card__cover-img" />
                      ) : (
                        <div className="project-card__placeholder" style={{ background: gradientBg }}>
                          <span className="project-card__initials">{initials}</span>
                        </div>
                      )}

                      {/* Badge de status sobreposto */}
                      <div className="project-card__status-badge">
                        <span className={`status-dot ${isLive ? 'live' : 'wip'}`}></span>
                        <span>{isLive ? t('proj.status.live') : t('proj.status.soon')}</span>
                      </div>

                      {/* Indicador de expansão */}
                      <div className={`project-card__expand-icon${isExpanded ? ' open' : ''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d={isExpanded ? 'M2 9l5-5 5 5' : 'M2 5l5 5 5-5'} />
                        </svg>
                      </div>
                    </div>

                    {/* Nome + teaser */}
                    <div className="project-card__meta">
                      <h3>{title}</h3>
                      {teaser && <p className="project-card__teaser">{teaser}</p>}
                      {tags.length > 0 && (
                        <div className="project-tags">
                          {tags.map((tag: string) => <span className="tag" key={tag}>{tag}</span>)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Conteúdo expandido ── */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="project-card__body"
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="project-card__body-inner">
                          {/* Description */}
                          {description && (
                            <MarkdownContent text={description} className="project-card__description" />
                          )}

                          {/* Galeria de evidências */}
                          {evidenceFiles.length > 0 && (
                            <div className="project-card__gallery">
                              <span className="project-card__gallery-label">
                                {lang === 'pt' ? 'Evidências' : lang === 'es' ? 'Evidencias' : 'Evidence'}
                              </span>
                              <div className="project-card__gallery-grid">
                                {evidenceFiles.map((filename: string) => {
                                  const url = buildEvidenceUrl(filename);
                                  return (
                                    <a
                                      key={filename}
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="project-card__thumb-link"
                                      title={filename}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <img
                                        src={url}
                                        alt={filename}
                                        className="project-card__thumb"
                                        loading="lazy"
                                      />
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Links + botão fechar */}
                          <div className="project-card__footer">
                            <div className="project-links">
                              {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" title="Abrir projeto" onClick={(e) => e.stopPropagation()}>
                                  <ExternalLink size={18} />
                                </a>
                              )}
                              {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" title="Ver no GitHub" onClick={(e) => e.stopPropagation()}>
                                  <Github size={18} />
                                </a>
                              )}
                            </div>
                            <button
                              className="project-card__close"
                              onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                            >
                              {lang === 'pt' ? 'Ver menos' : lang === 'es' ? 'Ver menos' : 'Show less'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                  <h3>{skill[`title_${lang}`] || skill.title_en || skill.title}</h3>
                  <p>{skill[`description_${lang}`] || skill.description_en || skill.description}</p>
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
