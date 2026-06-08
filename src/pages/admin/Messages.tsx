import { useState, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import toast from 'react-hot-toast';
import { Mail, MailOpen, CheckCircle, Trash2, Clock, User } from 'lucide-react';

export const MessagesAdmin = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread' | 'replied'>('all');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await pb.collection('messages').getFullList({
                sort: '-created',
                requestKey: null
            });
            setMessages(data);
        } catch (err: any) {
            if (err.isAbort) return;
            console.error('Error fetching messages:', err);
            const msg = err.response?.message || err.message || 'Erro ao carregar mensagens.';
            toast.error(`Erro ao carregar mensagens: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleRead = async (id: string, currentStatus: boolean) => {
        try {
            await pb.collection('messages').update(id, { read: !currentStatus });
            setMessages(messages.map(m => m.id === id ? { ...m, read: !currentStatus } : m));
            toast.success(currentStatus ? 'Marcada como não lida' : 'Marcada como lida');
        } catch (err) {
            toast.error('Erro ao atualizar status.');
        }
    };

    const toggleReplied = async (id: string, currentStatus: boolean) => {
        try {
            await pb.collection('messages').update(id, { replied: !currentStatus });
            setMessages(messages.map(m => m.id === id ? { ...m, replied: !currentStatus } : m));
            toast.success(currentStatus ? 'Marcada como não respondida' : 'Marcada como respondida');
        } catch (err) {
            toast.error('Erro ao atualizar status.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta mensagem?')) return;
        try {
            await pb.collection('messages').delete(id);
            setMessages(messages.filter(m => m.id !== id));
            toast.success('Mensagem excluída.');
        } catch (err) {
            toast.error('Erro ao excluir mensagem.');
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'Recém-adicionado';
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 'Recém-adicionado' : date.toLocaleString();
    };

    const filteredMessages = messages.filter(m => {
        if (filter === 'unread') return !m.read;
        if (filter === 'replied') return m.replied;
        return true;
    });

    if (loading) return <div>Carregando mensagens...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Caixa de Entrada</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setFilter('all')}
                        className={`btn-secondary ${filter === 'all' ? 'active' : ''}`}
                        style={{ padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', background: filter === 'all' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`btn-secondary ${filter === 'unread' ? 'active' : ''}`}
                        style={{ padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', background: filter === 'unread' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}
                    >
                        Não Lidas
                    </button>
                    <button
                        onClick={() => setFilter('replied')}
                        className={`btn-secondary ${filter === 'replied' ? 'active' : ''}`}
                        style={{ padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', background: filter === 'replied' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}
                    >
                        Respondidas
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filteredMessages.map(msg => (
                    <div
                        key={msg.id}
                        className="glass"
                        style={{
                            padding: '20px',
                            borderRadius: '15px',
                            borderLeft: msg.read ? 'none' : '4px solid var(--primary)',
                            opacity: msg.read ? 0.8 : 1,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%' }}>
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>{msg.name}</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{msg.email}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <Clock size={14} />
                                {formatDate(msg.created)}
                            </div>
                        </div>

                        <div style={{ padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
                            {msg.message}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    onClick={() => toggleRead(msg.id, msg.read)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', color: msg.read ? 'var(--text-muted)' : 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    {msg.read ? <MailOpen size={18} /> : <Mail size={18} />}
                                    {msg.read ? 'Marcar como não lida' : 'Marcar como lida'}
                                </button>
                                <button
                                    onClick={() => toggleReplied(msg.id, msg.replied)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', color: msg.replied ? '#4ade80' : 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    <CheckCircle size={18} />
                                    {msg.replied ? 'Respondida' : 'Marcar como respondida'}
                                </button>
                            </div>
                            <button
                                onClick={() => handleDelete(msg.id)}
                                style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <Trash2 size={18} /> Excluir
                            </button>
                        </div>
                    </div>
                ))}

                {filteredMessages.length === 0 && (
                    <div className="glass" style={{ padding: '40px', textAlign: 'center', borderRadius: '15px', color: 'var(--text-muted)' }}>
                        Nenhuma mensagem encontrada nesta categoria.
                    </div>
                )}
            </div>
        </div>
    );
};
