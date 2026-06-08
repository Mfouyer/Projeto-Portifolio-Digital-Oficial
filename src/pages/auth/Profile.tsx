import { useState, useRef, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, Save, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const Profile = () => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setName(user.name || user.username || '');
            setEmail(user.email || '');

            if (user.avatar) {
                setAvatarPreview(`${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}?thumb=100x100`);
            }
        }
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            // Usually, updating email directly might require re-verification depending on PocketBase settings,
            // but we will attempt to update it here for completeness.
            formData.append('email', email);

            if (selectedFile) {
                formData.append('avatar', selectedFile);
            }

            await pb.collection('users').update(user.id, formData);
            toast.success('Perfil atualizado com sucesso!');

            // Clear the file selection
            setSelectedFile(null);
        } catch (err: any) {
            toast.error(err?.message || 'Erro ao atualizar perfil.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="portfolio" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
            <div className="bg-glow" />
            <div className="bg-spheres">
                <div className="sphere" style={{ width: '400px', height: '400px', background: 'var(--primary)', top: '10%', right: '10%', animationDelay: '0s' }} />
            </div>

            <div className="glass" style={{ padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '500px', zIndex: 10 }}>
                <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>Meu Perfil</h2>

                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                    {/* Avatar Upload Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                        <div
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '2px solid var(--primary)',
                                cursor: 'pointer'
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <UserIcon size={48} color="var(--primary)" />
                            )}

                            <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.5)', padding: '5px 0', display: 'flex', justifyContent: 'center' }}>
                                <Camera size={16} color="white" />
                            </div>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Clique na imagem para alterar o avatar</span>
                    </div>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%' }} />

                    {/* User Data Section */}
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Nome Completo</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                        {isLoading ? 'Salvando...' : <><Save size={20} /> Salvar Alterações</>}
                    </button>
                </form>
            </div>
        </div>
    );
};
