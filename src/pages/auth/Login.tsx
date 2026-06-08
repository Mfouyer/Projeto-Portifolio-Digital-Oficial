import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pb } from '../../lib/pocketbase';
import { User, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export const UserLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Authenticate as a regular user against the 'users' collection
            await pb.collection('users').authWithPassword(email, password);
            toast.success('Login bem sucedido!');
            navigate('/');
        } catch (err: any) {
            toast.error(err?.message || 'Email ou senha inválidos.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="portfolio" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="bg-glow" />
            <div className="bg-spheres">
                <div className="sphere" style={{ width: '400px', height: '400px', background: 'var(--primary)', top: '-5%', left: '5%', animationDelay: '0s' }} />
            </div>

            <div className="glass" style={{ padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', marginBottom: '15px' }}>
                        <User size={32} />
                    </div>
                    <h2 style={{ color: 'white', margin: 0 }}>Bem-vindo de volta!</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Acesse sua conta para continuar</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Sua Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {isLoading ? 'Entrando...' : <><LogIn size={20} /> Entrar</>}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
                    Ainda não tem conta? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Cadastre-se</Link>
                </div>
            </div>
        </div>
    );
};
