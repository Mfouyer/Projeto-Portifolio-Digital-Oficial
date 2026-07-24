import { useState, useEffect, useRef } from 'react';
import { pb } from '../../lib/pocketbase';
import toast from 'react-hot-toast';
import { Upload, FileText, ExternalLink } from 'lucide-react';

export const CvUpload = () => {
    const [record, setRecord] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchRecord();
    }, []);

    const fetchRecord = async () => {
        try {
            const rec = await pb.collection('site_assets').getFirstListItem('key="cv"', { requestKey: null });
            setRecord(rec);
        } catch (err: any) {
            if (err.isAbort) return;
            toast.error('Erro ao carregar registo do CV.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        const file = fileRef.current?.files?.[0];
        if (!file) { toast.error('Seleciona um ficheiro PDF.'); return; }
        if (file.type !== 'application/pdf') { toast.error('Apenas ficheiros PDF são aceites.'); return; }
        if (!record) { toast.error('Registo do CV não encontrado.'); return; }

        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const updated = await pb.collection('site_assets').update(record.id, fd);
            setRecord(updated);
            toast.success('CV atualizado com sucesso!');
            if (fileRef.current) fileRef.current.value = '';
        } catch (err: any) {
            const msg = err.response?.message || err.message || 'Erro desconhecido.';
            toast.error(`Erro ao fazer upload: ${msg}`);
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const cvFileUrl = record?.file
        ? pb.files.getURL(record, record.file)
        : null;

    if (loading) return <div>A carregar...</div>;

    return (
        <div>
            <h2 style={{ marginBottom: '30px' }}>Carregar CV</h2>

            <div className="glass" style={{ padding: '24px', borderRadius: '15px', marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-muted)' }}>CV atual</h3>
                {record?.file ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <FileText size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                        <span style={{ wordBreak: 'break-all' }}>{record.file}</span>
                        {cvFileUrl && (
                            <a
                                href={cvFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontSize: '0.85rem', flexShrink: 0 }}
                            >
                                <ExternalLink size={14} /> Abrir PDF
                            </a>
                        )}
                    </div>
                ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Nenhum CV carregado ainda.</span>
                )}
            </div>

            <div className="glass" style={{ padding: '24px', borderRadius: '15px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Carregar novo CV (PDF)</h3>
                <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="application/pdf"
                        required
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '8px',
                            padding: '12px',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            background: uploading ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: uploading ? 'not-allowed' : 'pointer',
                            fontWeight: 600,
                            width: 'fit-content',
                        }}
                    >
                        <Upload size={18} />
                        {uploading ? 'A fazer upload...' : 'Atualizar CV'}
                    </button>
                </form>

                <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Link do magic link: </span>
                    <a
                        href="/cv/download"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--primary)', fontSize: '0.85rem' }}
                    >
                        /cv/download
                    </a>
                </div>
            </div>
        </div>
    );
};
