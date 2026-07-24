import { useState } from 'react';
import { pb } from '../../lib/pocketbase';
import toast from 'react-hot-toast';
import { KeyRound, Info } from 'lucide-react';

export const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const inputStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '8px',
        padding: '12px',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            toast.error('A nova senha deve ter pelo menos 8 caracteres.');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('A nova senha e a confirmação não coincidem.');
            return;
        }

        const userId = pb.authStore.record?.id;
        if (!userId) {
            toast.error('Sessão inválida. Faz login novamente.');
            return;
        }

        setLoading(true);
        try {
            await pb.collection('_superusers').update(userId, {
                oldPassword,
                password: newPassword,
                passwordConfirm: confirmPassword,
            });

            toast.success('Senha alterada! Vais ser redirigido para o login.');
            setTimeout(() => {
                pb.authStore.clear();
                window.location.href = '/admin/login';
            }, 1500);
        } catch (err: any) {
            const data = err.response?.data;
            if (data?.oldPassword) {
                toast.error('Senha atual incorreta.');
            } else {
                const msg = err.response?.message || err.message || 'Erro desconhecido.';
                toast.error(`Erro ao alterar senha: ${msg}`);
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '30px' }}>Alterar Senha</h2>

            <div
                className="glass"
                style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    background: 'rgba(139,92,246,0.08)',
                    border: '1px solid rgba(139,92,246,0.25)',
                }}
            >
                <Info size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Esta é a tua conta pessoal de admin. Os automatismos do site usam uma conta separada,
                    por isso podes mudar esta senha à vontade sem afetar nada.
                </p>
            </div>

            <div className="glass" style={{ padding: '28px', borderRadius: '15px', maxWidth: '480px' }}>
                <h3 style={{ marginBottom: '24px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <KeyRound size={18} style={{ color: 'var(--primary)' }} />
                    Nova senha
                </h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Senha atual</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nova senha</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            minLength={8}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mínimo 8 caracteres</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Confirmar nova senha</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            minLength={8}
                            style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '8px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            background: loading ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: 600,
                            fontSize: '1rem',
                        }}
                    >
                        <KeyRound size={18} />
                        {loading ? 'A alterar...' : 'Alterar senha'}
                    </button>
                </form>
            </div>
        </div>
    );
};
