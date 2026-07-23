import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

/* ─────────────────────────────────────────────────────────────────
   StackTecnico — secção "COMO CONSTRUO / HOW I BUILD / CÓMO CONSTRUYO"
   Chips/badges agrupados por tema. Sem ícones pesados, sem animações
   agressivas. Visual coerente com architect.css (tokens CSS da página).
   ───────────────────────────────────────────────────────────────── */

interface Group {
  id: string;
  titleKey: string;
  keywords: string[];
}

const GROUPS: Group[] = [
  {
    id: 'agentes',
    titleKey: 'stack.group.agentes',
    keywords: ['AI Agents', 'Agentic AI', 'Multi-agent', 'MCP', 'Tool use', 'n8n', 'LangGraph'],
  },
  {
    id: 'rag',
    titleKey: 'stack.group.rag',
    keywords: ['RAG', 'Vector DB', 'Embeddings', 'Chunking', 'Semantic search'],
  },
  {
    id: 'governanca',
    titleKey: 'stack.group.governanca',
    keywords: ['AI Governance', 'Guardrails', 'Evals', 'Observability', 'LLMOps'],
  },
  {
    id: 'integracao',
    titleKey: 'stack.group.integracao',
    keywords: ['API', 'SDK', 'Power Platform', 'Copilot Studio', 'Dify', 'Azure AI Foundry'],
  },
];

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    transition={{ duration: 0.55, delay }}
  >
    {children}
  </motion.div>
);

const StackTecnico: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="stack">
      <div className="container">
        <span className="section-label">{t('stack.eyebrow')}</span>

        <FadeUp>
          <h2>{t('stack.subtitle')}</h2>
        </FadeUp>

        <div className="stack-grid">
          {GROUPS.map((group, gi) => (
            <FadeUp key={group.id} delay={0.1 * gi} className="stack-group">
              <h3 className="stack-group-title">{t(group.titleKey)}</h3>
              <div className="stack-chips">
                {group.keywords.map((kw) => (
                  <span key={kw} className="stack-chip">{kw}</span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        /* ─── Stack Tecnico ─── */
        .architect-page #stack {
          background: var(--surface);
        }

        .architect-page .stack-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-top: 48px;
        }

        .architect-page .stack-group {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          transition: border-color 0.25s;
        }

        .architect-page .stack-group:hover {
          border-color: rgba(217,119,6,0.3);
        }

        .architect-page .stack-group-title {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--amber);
          text-transform: uppercase;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .architect-page .stack-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .architect-page .stack-chip {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 12px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          white-space: nowrap;
        }

        .architect-page .stack-chip:hover {
          color: var(--text);
          border-color: rgba(217,119,6,0.35);
          background: var(--amber-dim);
        }

        @media (max-width: 768px) {
          .architect-page .stack-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default StackTecnico;
