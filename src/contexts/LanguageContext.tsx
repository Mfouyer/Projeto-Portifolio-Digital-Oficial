import React from 'react';
import { I18N, I18N_LANGS, type Lang } from '../i18n/translations';

const STORAGE_KEY = 'portfolio_lang';

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && (I18N_LANGS as string[]).includes(saved)) return saved as Lang;
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('pt')) return 'pt';
  if (nav.startsWith('es')) return 'es';
  return 'en';
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Translate a key. Returns the raw string (may contain inline markup the caller renders explicitly). */
  t: (key: string) => string;
  /** Typed phrases for the active language. */
  typed: string[];
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = React.useState<Lang>(() => detectLang());

  const setLang = React.useCallback((next: Lang) => {
    if (!(I18N_LANGS as string[]).includes(next)) next = 'en';
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  // Keep <html lang>, <title> and meta description in sync with the active language.
  React.useEffect(() => {
    const dict = I18N[lang];
    document.documentElement.setAttribute('lang', lang);
    const title = dict['meta.title'];
    if (typeof title === 'string') document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const desc = dict['meta.desc'];
    if (metaDesc && typeof desc === 'string') metaDesc.setAttribute('content', desc);
  }, [lang]);

  const t = React.useCallback(
    (key: string): string => {
      const value = I18N[lang][key];
      if (typeof value === 'string') return value;
      return key; // fallback: surface the missing key instead of crashing
    },
    [lang],
  );

  const value = React.useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t, typed: I18N[lang]._typed }),
    [lang, setLang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
