import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { pb } from '../lib/pocketbase';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/cv-modal.css';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

type Role = 'recruiter' | 'client' | 'partner' | 'enthusiast' | 'other';

const ROLES: Role[] = ['recruiter', 'client', 'partner', 'enthusiast', 'other'];

export const CvModal: React.FC<CvModalProps> = ({ open, onClose }) => {
  const { t } = useLanguage();
  const [form, setForm] = React.useState({ name: '', company: '', role: '' as Role | '', email: '' });
  const [honeypot, setHoneypot] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');
  const [fieldErrors, setFieldErrors] = React.useState({ name: false, company: false, role: false, email: false });
  const emailRef = React.useRef('');

  // Reset form when modal closes
  React.useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setForm({ name: '', company: '', role: '', email: '' });
        setSubmitted(false);
        setError('');
        setHoneypot('');
        setFieldErrors({ name: false, company: false, role: false, email: false });
        emailRef.current = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // honeypot triggered — silent discard

    // Validate all fields — mark which are empty
    const errors = {
      name: !form.name.trim(),
      company: !form.company.trim(),
      role: !form.role,
      email: !form.email.trim(),
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    setSubmitting(true);
    setError('');
    emailRef.current = form.email.trim();

    try {
      await pb.collection('cv_requests').create({
        name: form.name.trim(),
        company: form.company.trim(),
        role: form.role,
        email: form.email.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('CV request error:', err);
      setError(t('contact.error') as string);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        /* Overlay is the flex container that centers the modal.
           Framer Motion animates opacity on the overlay and y/scale on the
           inner card without conflicting with CSS transform-based positioning. */
        <motion.div
          className="cv-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          {/* Modal card — click stops propagation so overlay onClick doesn't fire */}
          <motion.div
            className="cv-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t('cv.modal.title') as string}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cv-modal-close" onClick={onClose} aria-label="Fechar">
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <div className="cv-modal-header">
                  <Download size={20} className="cv-modal-icon" />
                  <h2>{t('cv.modal.title')}</h2>
                  <p>{t('cv.modal.subtitle')}</p>
                </div>

                <form className="cv-modal-form" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field — hidden from real users */}
                  <input
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                    style={{ display: 'none' }}
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                  />

                  <div className={`cv-form-field${fieldErrors.name ? ' cv-form-field--error' : ''}`}>
                    <input
                      type="text"
                      placeholder={t('cv.field.name') as string}
                      value={form.name}
                      onChange={e => {
                        setForm(f => ({ ...f, name: e.target.value }));
                        if (fieldErrors.name) setFieldErrors(fe => ({ ...fe, name: false }));
                      }}
                      required
                      autoFocus
                      autoComplete="name"
                    />
                  </div>

                  <div className={`cv-form-field${fieldErrors.company ? ' cv-form-field--error' : ''}`}>
                    <input
                      type="text"
                      placeholder={t('cv.field.company') as string}
                      value={form.company}
                      onChange={e => {
                        setForm(f => ({ ...f, company: e.target.value }));
                        if (fieldErrors.company) setFieldErrors(fe => ({ ...fe, company: false }));
                      }}
                      required
                      autoComplete="organization"
                    />
                  </div>

                  <div className={`cv-form-field${fieldErrors.role ? ' cv-form-field--error' : ''}`}>
                    <select
                      value={form.role}
                      onChange={e => {
                        setForm(f => ({ ...f, role: e.target.value as Role }));
                        if (fieldErrors.role) setFieldErrors(fe => ({ ...fe, role: false }));
                      }}
                      required
                    >
                      <option value="" disabled>
                        {t('cv.role.placeholder')}
                      </option>
                      {ROLES.map(r => (
                        <option key={r} value={r}>
                          {t(`cv.role.${r}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={`cv-form-field${fieldErrors.email ? ' cv-form-field--error' : ''}`}>
                    <input
                      type="email"
                      placeholder={t('cv.field.email') as string}
                      value={form.email}
                      onChange={e => {
                        setForm(f => ({ ...f, email: e.target.value }));
                        if (fieldErrors.email) setFieldErrors(fe => ({ ...fe, email: false }));
                      }}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <p className="cv-consent">{t('cv.consent')}</p>

                  {error && <p className="cv-error">{error}</p>}

                  <button type="submit" className="cv-btn-submit" disabled={submitting}>
                    {submitting
                      ? (t('cv.btn.submitting') as string)
                      : (t('cv.btn.submit') as string)}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                className="cv-modal-success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <span className="cv-success-icon">✉️</span>
                <h3>{t('cv.success.title')}</h3>
                <p>
                  {t('cv.success.body')}{' '}
                  <strong>{emailRef.current}</strong>.
                </p>
                <p className="cv-success-note">{t('cv.success.note')}</p>
                <button className="cv-btn-close-success" onClick={onClose}>
                  {t('cv.success.close') || 'Fechar'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
