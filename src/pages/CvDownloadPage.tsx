import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LangSwitcher from '../components/LangSwitcher';
import '../styles/cv-download.css';

const PB_URL = import.meta.env.VITE_PB_URL || 'http://localhost:8091';

type Status = 'loading' | 'success' | 'error';

export const CvDownloadPage: React.FC = () => {
  const { t, lang } = useLanguage();
  const [status, setStatus] = React.useState<Status>('loading');
  const [downloadUrl, setDownloadUrl] = React.useState('');

  // Update meta title
  React.useEffect(() => {
    document.title = `CV — Marcos Fouyer`;
  }, [lang]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      return;
    }

    const url = `${PB_URL}/api/cv-download?token=${encodeURIComponent(token)}`;
    setDownloadUrl(url);

    // Verify the token before triggering download
    fetch(url, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setStatus('success');
          // Trigger the download
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Marcos-Fouyer-CV.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="cv-dl-page">
      {/* Nav */}
      <nav className="cv-dl-nav">
        <div className="cv-dl-nav-inner">
          <Link to="/" className="cv-dl-logo">
            EF<span>.</span>dev
          </Link>
          <LangSwitcher />
        </div>
      </nav>

      {/* Content */}
      <div className="cv-dl-container">
        {status === 'loading' && (
          <motion.div
            className="cv-dl-box"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="cv-dl-spinner" />
            <p className="cv-dl-loading-text">{t('cv.download.loading')}</p>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            className="cv-dl-box"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="cv-dl-success-icon">
              <Download size={28} />
            </div>
            <h1>{t('cv.download.success.title')}</h1>
            <p>{t('cv.download.success.body')}</p>
            <p className="cv-dl-fallback">
              {t('cv.download.success.fallback')}{' '}
              <a href={downloadUrl} download="Marcos-Fouyer-CV.pdf">
                {t('cv.download.success.link')}
              </a>
              .
            </p>
            <Link to="/" className="cv-dl-back-btn">
              {t('cv.download.back')}
            </Link>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            className="cv-dl-box cv-dl-box--error"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="cv-dl-error-icon">
              <AlertCircle size={28} />
            </div>
            <h1>{t('cv.download.error.title')}</h1>
            <p>{t('cv.download.error.body')}</p>
            <Link to="/" className="cv-dl-cta-btn">
              {t('cv.download.error.cta')}
            </Link>
            <Link to="/" className="cv-dl-back-link">
              {t('cv.download.back')}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
