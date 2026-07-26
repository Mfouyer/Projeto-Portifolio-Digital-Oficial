import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Newspaper, Radio } from 'lucide-react';
import { pb } from '../lib/pocketbase';
import { useLanguage } from '../contexts/LanguageContext';
import LangSwitcher from '../components/LangSwitcher';
import '../styles/news-page.css';

interface NewsRecord {
  id: string;
  title: string;
  url: string;
  source: string;
  summary: string;
  published: string;
  category: string;
}

interface NewsGroup {
  key: string;
  label: string;
  shortLabel: string;
  items: NewsRecord[];
}

const PAGE_SIZE = 20;

const CATEGORY_COLORS: Record<string, string> = {
  models: '#D97706',
  business: '#16A34A',
  research: '#2563EB',
  tools: '#7C3AED',
  policy: '#DC2626',
};

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function groupLabel(
  dateStr: string,
  todayStr: string,
  yesterdayStr: string,
  lang: string
): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return todayStr;
  if (isSameDay(date, yesterday)) return yesterdayStr;

  const locale = lang === 'pt' ? 'pt-PT' : lang === 'es' ? 'es-ES' : 'en-GB';
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function groupShortLabel(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const locale = lang === 'pt' ? 'pt-PT' : lang === 'es' ? 'es-ES' : 'en-GB';
  const day = date.toLocaleDateString(locale, { day: 'numeric' });
  const month = date.toLocaleDateString(locale, { month: 'short' }).toUpperCase().replace('.', '');
  return `${day} ${month}`;
}

function timeLabel(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const locale = lang === 'pt' ? 'pt-PT' : lang === 'es' ? 'es-ES' : 'en-GB';
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

function dateKey(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
}

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function getCategoryStyle(category: string): React.CSSProperties {
  const color = CATEGORY_COLORS[category] || '#7A7A8A';
  return {
    color,
    backgroundColor: color + '1A',
    borderColor: color + '33',
  };
}

/* ─── Ticker ─── */
interface TickerProps {
  items: NewsRecord[];
  tickerLabel: string;
}

const Ticker: React.FC<TickerProps> = ({ items, tickerLabel }) => {
  if (items.length === 0) return null;
  const headlines = items.map(i => i.title);
  const repeated = [...headlines, ...headlines];

  return (
    <div className="news-ticker-bar">
      <span className="news-ticker-label">
        <Radio size={8} />
        {tickerLabel}
      </span>
      <div className="news-ticker-track-wrapper">
        <div className="news-ticker-track">
          {repeated.map((h, i) => (
            <span key={i} className="news-ticker-item">
              {h}
              <span className="news-ticker-sep">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Hero card ─── */
interface HeroCardProps {
  item: NewsRecord;
  lang: string;
  readMinLabel: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ item, lang, readMinLabel }) => {
  const mins = readingMinutes((item.summary || '') + ' ' + item.title);
  const catStyle = getCategoryStyle(item.category);

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-hero-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="news-hero-body">
        <div className="news-hero-meta">
          {item.category && (
            <span className="news-cat-badge" style={catStyle}>
              {item.category.toUpperCase()}
            </span>
          )}
          {item.source && (
            <span className="news-source-badge">{item.source}</span>
          )}
          <span className="news-hero-time">{timeLabel(item.published, lang)}</span>
          <span className="news-read-time">{mins} {readMinLabel}</span>
        </div>
        <h2 className="news-hero-title">
          {item.title}
          <ExternalLink size={16} className="news-hero-ext" />
        </h2>
        {item.summary && (
          <p className="news-hero-summary">{item.summary}</p>
        )}
      </div>
    </motion.a>
  );
};

/* ─── Regular card ─── */
interface NewsCardProps {
  item: NewsRecord;
  lang: string;
  readMinLabel: string;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, lang, readMinLabel, index }) => {
  const mins = readingMinutes((item.summary || '') + ' ' + item.title);
  const catStyle = getCategoryStyle(item.category);

  return (
    <motion.div
      className="news-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
    >
      <div className="news-card-header">
        {item.category && (
          <span className="news-cat-badge" style={catStyle}>
            {item.category.toUpperCase()}
          </span>
        )}
        {item.source && (
          <span className="news-source-badge">{item.source}</span>
        )}
        <span className="news-time">{timeLabel(item.published, lang)}</span>
        <span className="news-read-time">{mins} {readMinLabel}</span>
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card-title"
      >
        {item.title}
        <ExternalLink size={11} className="news-ext-icon" />
      </a>
      {item.summary && (
        <p className="news-card-summary">{item.summary}</p>
      )}
    </motion.div>
  );
};

/* ─── Group grid ─── */
interface GroupGridProps {
  items: NewsRecord[];
  lang: string;
  readMinLabel: string;
  isFirst: boolean;
}

const GroupGrid: React.FC<GroupGridProps> = ({ items, lang, readMinLabel, isFirst }) => {
  if (items.length === 0) return null;

  if (isFirst) {
    const [hero, ...rest] = items;
    return (
      <div className="news-group-content">
        <HeroCard item={hero} lang={lang} readMinLabel={readMinLabel} />
        {rest.length > 0 && (
          <div className="news-grid-asymmetric">
            {rest.map((item, i) => (
              <NewsCard
                key={item.id}
                item={item}
                lang={lang}
                readMinLabel={readMinLabel}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="news-grid-asymmetric">
      {items.map((item, i) => (
        <NewsCard
          key={item.id}
          item={item}
          lang={lang}
          readMinLabel={readMinLabel}
          index={i}
        />
      ))}
    </div>
  );
};

/* ─── Main page ─── */
export const NewsPage: React.FC = () => {
  const { t, lang } = useLanguage();
  const [items, setItems] = React.useState<NewsRecord[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

  // Update meta tags
  React.useEffect(() => {
    document.title = t('news.meta.title') as string;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('news.meta.desc') as string);
  }, [lang]);

  // Initial fetch
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    pb.collection('news')
      .getList(1, PAGE_SIZE, { sort: '-published', requestKey: 'news-page-init' })
      .then(res => {
        if (cancelled) return;
        setItems(res.items as unknown as NewsRecord[]);
        setTotalPages(res.totalPages);
        setPage(1);
      })
      .catch(err => {
        if (cancelled || err?.isAbort) return;
        console.error('News fetch error:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const next = page + 1;
      const res = await pb.collection('news').getList(next, PAGE_SIZE, {
        sort: '-published',
        requestKey: null,
      });
      setItems(prev => [...prev, ...(res.items as unknown as NewsRecord[])]);
      setPage(next);
    } catch (err) {
      console.error('Load more error:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Group by date — identical logic to original
  const groups: NewsGroup[] = React.useMemo(() => {
    const todayStr = t('news.today') as string;
    const yesterdayStr = t('news.yesterday') as string;
    const map: Record<string, NewsGroup> = {};

    items.forEach(item => {
      const key = dateKey(item.published);
      if (!map[key]) {
        map[key] = {
          key,
          label: groupLabel(item.published, todayStr, yesterdayStr, lang),
          shortLabel: groupShortLabel(item.published, lang),
          items: [],
        };
      }
      map[key].items.push(item);
    });

    return Object.values(map).sort((a, b) => b.key.localeCompare(a.key));
  }, [items, lang]);

  // Latest N headlines for the ticker
  const tickerItems = React.useMemo(() => items.slice(0, 12), [items]);

  const tickerLabel = t('news.ticker_label') as string;
  const readMinLabel = t('news.read_min') as string;

  return (
    <div className="news-page">
      {/* ─── Nav ─── */}
      <nav className="news-nav">
        <div className="news-nav-inner">
          <Link to="/" className="news-nav-logo">
            EF<span>.</span>dev
          </Link>
          <div className="news-nav-right">
            <Link to="/" className="news-back-link">
              {t('news.back')}
            </Link>
            <LangSwitcher />
          </div>
        </div>
      </nav>

      {/* ─── Ticker bar ─── */}
      {!loading && items.length > 0 && (
        <Ticker items={tickerItems} tickerLabel={tickerLabel} />
      )}

      {/* ─── Content ─── */}
      <div className="news-container">
        {/* ─── Header ─── */}
        <motion.div
          className="news-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="news-eyebrow">{t('news.label')}</span>
          <div className="news-header-divider" />
          <p className="news-cortex">{t('news.cortex')}</p>
        </motion.div>

        {/* ─── States ─── */}
        {loading ? (
          <div className="news-loading">
            <span className="news-loading-dot" />
            <span className="news-loading-dot" />
            <span className="news-loading-dot" />
          </div>
        ) : items.length === 0 ? (
          <AnimatePresence>
            <motion.div
              className="news-empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Newspaper size={40} className="news-empty-icon-svg" />
              <p className="news-empty-title">{t('news.empty')}</p>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="news-feed">
            {groups.map((group, gi) => (
              <motion.section
                key={group.key}
                className="news-group"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: gi * 0.06 }}
              >
                {/* ─── Date separator ─── */}
                <div className="news-date-separator">
                  <div className="news-date-line" />
                  <span className="news-date-label">{group.shortLabel}</span>
                  <div className="news-date-line" />
                </div>

                <GroupGrid
                  items={group.items}
                  lang={lang}
                  readMinLabel={readMinLabel}
                  isFirst={gi === 0}
                />
              </motion.section>
            ))}

            {/* ─── Load more ─── */}
            {page < totalPages && (
              <div className="news-load-more">
                <button
                  className="btn-load-more"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  <span className="btn-load-more-line" />
                  <span className="btn-load-more-text">
                    {loadingMore
                      ? (t('news.loading') as string)
                      : (t('news.load_more') as string)}
                  </span>
                  <span className="btn-load-more-line" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
