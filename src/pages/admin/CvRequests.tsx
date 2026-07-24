import { useState, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import toast from 'react-hot-toast';
import { Trash2, Download, Clock } from 'lucide-react';

const PAGE_SIZE = 20;

export const CvRequests = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchRequests(page);
    }, [page]);

    const fetchRequests = async (p: number) => {
        setLoading(true);
        try {
            const result = await pb.collection('cv_requests').getList(p, PAGE_SIZE, {
                sort: '-created',
                requestKey: null,
            });
            setRequests(result.items);
            setTotalPages(result.totalPages);
            setTotalItems(result.totalItems);
        } catch (err: any) {
            if (err.isAbort) return;
            toast.error('Erro ao carregar pedidos de CV.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Apagar este pedido?')) return;
        try {
            await pb.collection('cv_requests').delete(id);
            setRequests(prev => prev.filter(r => r.id !== id));
            setTotalItems(n => n - 1);
            toast.success('Pedido apagado.');
        } catch (err) {
            toast.error('Erro ao apagar pedido.');
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? '—' : d.toLocaleString('pt-PT');
    };

    if (loading) return <div>A carregar pedidos...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Pedidos de CV</h2>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {totalItems} {totalItems === 1 ? 'pedido' : 'pedidos'} no total
                </span>
            </div>

            {requests.length === 0 ? (
                <div className="glass" style={{ padding: '40px', textAlign: 'center', borderRadius: '15px', color: 'var(--text-muted)' }}>
                    Nenhum pedido de CV ainda.
                </div>
            ) : (
                <>
                    <div className="glass" style={{ borderRadius: '15px', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    {['Nome', 'Empresa', 'Função', 'Email', 'Data do pedido', 'Descarregou', 'Nº downloads', ''].map(h => (
                                        <th
                                            key={h}
                                            style={{
                                                padding: '14px 16px',
                                                textAlign: 'left',
                                                fontSize: '0.75rem',
                                                color: 'var(--text-muted)',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, i) => (
                                    <tr
                                        key={req.id}
                                        style={{
                                            borderBottom: i < requests.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                            transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                    >
                                        <td style={{ padding: '14px 16px', fontWeight: 500 }}>{req.name || '—'}</td>
                                        <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{req.company || '—'}</td>
                                        <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{req.role || '—'}</td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <a
                                                href={`mailto:${req.email}`}
                                                style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}
                                            >
                                                {req.email}
                                            </a>
                                        </td>
                                        <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Clock size={13} /> {formatDate(req.created)}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                            {req.downloaded_at ? (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#4ade80', fontSize: '0.85rem' }}>
                                                    <Download size={13} /> Sim
                                                </span>
                                            ) : (
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Não</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                            {req.download_count ?? 0}
                                        </td>
                                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDelete(req.id)}
                                                title="Apagar pedido"
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#ff4444',
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    padding: '4px',
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    color: page === 1 ? 'var(--text-muted)' : 'white',
                                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                                }}
                            >
                                ← Anterior
                            </button>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    color: page === totalPages ? 'var(--text-muted)' : 'white',
                                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                }}
                            >
                                Próxima →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
