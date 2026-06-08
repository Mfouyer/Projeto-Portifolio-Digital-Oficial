import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pb } from '../../lib/pocketbase';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export const UserRegister = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            toast.error('As senhas não coincidem!');
            return;
        }

        setIsLoading(true);

        try {
            const data = {
                username: email.split('@')[0] + Math.floor(Math.random() * 1000), // temp username
                email,
                emailVisibility: true,
                password,
                passwordConfirm,
                name,
                role: 'user' // default role
            };

            // Create user record
            await pb.collection('users').create(data);

            // Auto login after registration
            await pb.collection('users').authWithPassword(email, password);

            toast.success('Conta criada com sucesso!');
            navigate('/');
        } catch (err: any) {
            toast.error(err?.message || 'Erro ao criar conta. Verifique os dados.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="portfolio" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="bg-glow" />
            <div className="bg-spheres">
                <div className="sphere" style={{ width: '400px', height: '400px', background: 'var(--accent)', bottom: '-5%', right: '5%', animationDelay: '-5s' }} />
            </div>

            <div className="glass" style={{ padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent)', marginBottom: '15px' }}>
                        <UserPlus size={32} />
                    </div>
                    <h2 style={{ color: 'white', margin: 0 }}>Criar Conta</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Junte-se à nossa comunidade</p>
                </div>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nome Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirmar Senha"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                        {isLoading ? 'Criando...' : 'Cadastrar'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
                    Já possui conta? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Faça login</Link>
                </div>
            </div>
        </div>
    );
};
