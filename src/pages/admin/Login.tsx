import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { pb } from '../../lib/pocketbase';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const from = location.state?.from?.pathname || "/admin";

    // Se já estiver logado como admin, redireciona direto
    if (pb.authStore.isValid && pb.authStore.isSuperuser) {
        navigate(from, { replace: true });
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Tenta logar apenas como administrador principal via _superusers
            await pb.collection('_superusers').authWithPassword(email, password);
            toast.success('Login bem sucedido!');
            navigate(from, { replace: true });
        } catch (err: any) {
            toast.error(err?.message || 'Falha na autenticação. Verifique suas credenciais de administrador.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
            <div className="glass" style={{ padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', marginBottom: '15px' }}>
                        <Lock size={32} />
                    </div>
                    <h2 style={{ color: 'white', margin: 0 }}>Admin Acess</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Faça login para gerenciar o portfólio</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Admin E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', justifyContent: 'center' }}>
                        {isLoading ? 'Autenticando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};
