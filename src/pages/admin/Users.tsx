import { useState, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import toast from 'react-hot-toast';
import { Trash2, Edit2, Plus, RefreshCw } from 'lucide-react';

export const Users = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const records = await pb.collection('users').getFullList({
                sort: '-created',
            });
            setUsers(records);
        } catch (e: any) {
            if (e.status === 404) {
                toast.error("A coleção 'users' ainda não foi criada no PocketBase.");
            } else {
                toast.error("Erro ao buscar usuários: " + e.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Certeza que deseja deletar este usuário?")) return;
        try {
            await pb.collection('users').delete(id);
            toast.success("Usuário deletado");
            setUsers(users.filter(u => u.id !== id));
        } catch (e: any) {
            toast.error("Erro ao deletar: " + e.message);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>User Management</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={fetchUsers} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary)', padding: '10px' }}>
                        <RefreshCw size={20} className={isLoading ? "spin" : ""} />
                    </button>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={20} /> Novo Usuário
                    </button>
                </div>
            </div>

            <div className="glass" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '20px', color: 'var(--text-muted)' }}>ID</th>
                            <th style={{ padding: '20px', color: 'var(--text-muted)' }}>Email/Username</th>
                            <th style={{ padding: '20px', color: 'var(--text-muted)' }}>Role</th>
                            <th style={{ padding: '20px', color: 'var(--text-muted)' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Carregando...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Nenhum usuário encontrado.</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '20px' }}>{user.id}</td>
                                    <td style={{ padding: '20px' }}>{user.email || user.username}</td>
                                    <td style={{ padding: '20px' }}>{user.role || 'user'}</td>
                                    <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                                        <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(user.id)} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
