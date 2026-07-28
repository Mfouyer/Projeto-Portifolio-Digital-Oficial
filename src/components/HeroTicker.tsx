import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/* ──────────────────────────────────────────────────────────
   HeroTicker — credibility strip below the hero section.
   Continuous horizontal scroll (duplicated array trick,
   same as /news ticker bar).
   No pause on hover — always running.
   Respects prefers-reduced-motion: static list instead.
   ────────────────────────────────────────────────────────── */

const TECH_ITEMS = ['N8N', 'POWER PLATFORM', 'DIFY', 'MCP', 'CLAUDE API', 'COOLIFY'];

const SEP = '·'; /* middle dot · */

export const HeroTicker: React.FC = () => {
  const { t } = useLanguage();

  const factItems = [
    t('ticker.fact1'),
    t('ticker.fact2'),
    t('ticker.fact3'),
    t('ticker.fact4'),
    t('ticker.fact5'),
    t('ticker.fact6'),
    ...TECH_ITEMS,
  ];

  /* Duplicate for seamless loop */
  const doubled = [...factItems, ...factItems];

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    return (
      <div className="hero-ticker hero-ticker--static" aria-label="Key facts">
        {factItems.map((item, i) => (
          <React.Fragment key={i}>
            <span className="hero-ticker__item">{item}</span>
            {i < factItems.length - 1 && (
              <span className="hero-ticker__sep" aria-hidden="true">{SEP}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="hero-ticker" aria-hidden="true">
      <div className="hero-ticker__track">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span className="hero-ticker__item">{item}</span>
            <span className="hero-ticker__sep">{SEP}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HeroTicker;
