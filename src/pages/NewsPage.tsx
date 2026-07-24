import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
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
  items: NewsRecord[];
}

const PAGE_SIZE = 20;

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

function timeLabel(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const locale = lang === 'pt' ? 'pt-PT' : lang === 'es' ? 'es-ES' : 'en-GB';
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

function dateKey(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
}

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

  // Group by date
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
          items: [],
        };
      }
      map[key].items.push(item);
    });

    return Object.values(map).sort((a, b) => b.key.localeCompare(a.key));
  }, [items, lang]);

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

      {/* ─── Content ─── */}
      <div className="news-container">
        {/* Header */}
        <motion.div
          className="news-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="news-eyebrow">{t('news.label')}</span>
          <p className="news-cortex">{t('news.cortex')}</p>
        </motion.div>

        {/* States */}
        {loading ? (
          <p className="news-loading">{t('news.loading')}</p>
        ) : items.length === 0 ? (
          <motion.div
            className="news-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className="news-empty-icon">◈</span>
            <p>{t('news.empty')}</p>
          </motion.div>
        ) : (
          <div className="news-feed">
            {groups.map((group, gi) => (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: gi * 0.04 }}
              >
                <div className="news-group-label">{group.label}</div>
                <div className="news-group-items">
                  {group.items.map(item => (
                    <div key={item.id} className="news-card">
                      <div className="news-card-header">
                        {item.source && (
                          <span className="news-source-badge">{item.source}</span>
                        )}
                        <span className="news-time">
                          {timeLabel(item.published, lang)}
                        </span>
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
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {page < totalPages && (
              <div className="news-load-more">
                <button
                  className="btn-load-more"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore
                    ? (t('news.loading') as string)
                    : (t('news.load_more') as string)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
