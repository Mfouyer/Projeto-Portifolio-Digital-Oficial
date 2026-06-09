import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FLAG_SVG, I18N_LANGS, I18N_NAMES, type Lang } from '../i18n/translations';

/**
 * Language dropdown with flags — faithful to the approved mockup
 * (trigger + listbox menu, closes on outside click / Escape).
 */
const LangSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <div className={`lang-switcher${open ? ' open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <span id="langCurrent">
          <span
            className="lang-flag"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: FLAG_SVG[lang] }}
          />
          <span className="lang-code">{lang.toUpperCase()}</span>
        </span>
        <svg
          className="lang-chevron"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="lang-menu" role="listbox">
        {I18N_LANGS.map((l) => (
          <button
            type="button"
            key={l}
            className={`lang-option${l === lang ? ' active' : ''}`}
            data-lang={l}
            role="option"
            aria-selected={l === lang}
            onClick={() => choose(l)}
          >
            <span
              className="lang-flag"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: FLAG_SVG[l] }}
            />
            <span>{I18N_NAMES[l]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LangSwitcher;
