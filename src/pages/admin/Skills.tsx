import { useState, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const SkillsAdmin = () => {
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<any>({ title: '', description: '', icon: 'Code2', highlighted: false });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const data = await pb.collection('skills').getFullList({
                sort: '-created',
                requestKey: null
            });
            setSkills(data);
        } catch (err: any) {
            if (err.isAbort) return; // Silent ignore aborted requests
            console.error('Error fetching skills:', err);
            const msg = err.response?.message || err.message || 'Erro ao carregar serviços.';
            toast.error(`Erro ao carregar serviços: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentSkill.id) {
                await pb.collection('skills').update(currentSkill.id, currentSkill);
                toast.success('Serviço atualizado!');
            } else {
                await pb.collection('skills').create(currentSkill);
                toast.success('Serviço criado!');
            }
            fetchSkills();
            setIsEditing(false);
            setCurrentSkill({ title: '', description: '', icon: 'Code2', highlighted: false });
        } catch (err: any) {
            console.error('Error details:', err);
            const detailedError = err.response?.data ? JSON.stringify(err.response.data) : (err.message || 'Erro ao salvar serviço.');
            toast.error(detailedError);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza?')) return;
        try {
            await pb.collection('skills').delete(id);
            toast.success('Serviço removido!');
            fetchSkills();
        } catch (err: any) {
            console.error('Error details:', err);
            const detailedError = err.response?.data ? JSON.stringify(err.response.data) : (err.message || 'Erro ao remover serviço.');
            toast.error(detailedError);
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Gerenciar o que eu faço (Serviços/Skills)</h2>
                <button className="btn-primary" onClick={() => { setIsEditing(true); setCurrentSkill({ title: '', description: '', icon: 'Code2', highlighted: false }); }}>
                    <Plus size={18} /> Novo Serviço
                </button>
            </div>

            {isEditing && (
                <div className="glass" style={{ padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
                    <h3>{currentSkill.id ? 'Editar Serviço' : 'Novo Serviço'}</h3>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                        <div>
                            <label>Título</label>
                            <input type="text" value={currentSkill.title} onChange={e => setCurrentSkill({ ...currentSkill, title: e.target.value })} required className="form-group input" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                        </div>
                        <div>
                            <label>Descrição</label>
                            <textarea value={currentSkill.description} onChange={e => setCurrentSkill({ ...currentSkill, description: e.target.value })} required rows={3} className="form-group textarea" style={{ width: '100%', padding: '10px', marginTop: '5px' }}></textarea>
                        </div>
                        <div>
                            <label>Ícone (Nome do Lucide-React. Ex: Code2, Layout, Cpu)</label>
                            <input type="text" value={currentSkill.icon} onChange={e => setCurrentSkill({ ...currentSkill, icon: e.target.value })} required className="form-group input" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" id="highlighted" checked={currentSkill.highlighted} onChange={e => setCurrentSkill({ ...currentSkill, highlighted: e.target.checked })} />
                            <label htmlFor="highlighted">Destacar na página inicial?</label>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" className="btn-primary">Salvar</button>
                            <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '15px' }}>Título</th>
                            <th style={{ padding: '15px' }}>Ícone</th>
                            <th style={{ padding: '15px' }}>Destacado</th>
                            <th style={{ padding: '15px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map(skill => (
                            <tr key={skill.id} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <td style={{ padding: '15px' }}>{skill.title}</td>
                                <td style={{ padding: '15px' }}>{skill.icon}</td>
                                <td style={{ padding: '15px' }}>{skill.highlighted ? 'Sim' : 'Não'}</td>
                                <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                                    <button onClick={() => { setIsEditing(true); setCurrentSkill(skill); }} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(skill.id)} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {skills.length === 0 && <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum serviço cadastrado.</div>}
            </div>
        </div>
    );
};
