import { useState, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export const ProjectsAdmin = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<any>({ title: '', description: '', tags: '', link: '', github: '', highlighted: false });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await pb.collection('projects').getFullList({
                sort: '-created',
                requestKey: null
            });
            setProjects(data);
        } catch (err: any) {
            if (err.isAbort) return; // Silent ignore aborted requests
            console.error('Error fetching projects:', err);
            const msg = err.response?.message || err.message || 'Erro ao carregar projetos.';
            toast.error(`Erro ao carregar projetos: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', currentProject.title);
            formData.append('description', currentProject.description);
            formData.append('tags', currentProject.tags);
            formData.append('link', currentProject.link || '');
            formData.append('github', currentProject.github || '');
            formData.append('highlighted', currentProject.highlighted);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (currentProject.id) {
                await pb.collection('projects').update(currentProject.id, formData);
                toast.success('Projeto atualizado!');
            } else {
                await pb.collection('projects').create(formData);
                toast.success('Projeto criado!');
            }
            fetchProjects();
            setIsEditing(false);
            setCurrentProject({ title: '', description: '', tags: '', link: '', github: '', highlighted: false });
            setImageFile(null);
        } catch (err: any) {
            console.error('Error details:', err);
            const detailedError = err.response?.data ? JSON.stringify(err.response.data) : (err.message || 'Erro ao salvar projeto.');
            toast.error(detailedError);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza?')) return;
        try {
            await pb.collection('projects').delete(id);
            toast.success('Projeto removido!');
            fetchProjects();
        } catch (err: any) {
            console.error('Error details:', err);
            const detailedError = err.response?.data ? JSON.stringify(err.response.data) : (err.message || 'Erro ao remover projeto.');
            toast.error(detailedError);
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Gerenciar Projetos</h2>
                <button className="btn-primary" onClick={() => { setIsEditing(true); setCurrentProject({ title: '', description: '', tags: '', link: '', github: '', highlighted: false }); setImageFile(null); }}>
                    <Plus size={18} /> Novo Projeto
                </button>
            </div>

            {isEditing && (
                <div className="glass" style={{ padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
                    <h3>{currentProject.id ? 'Editar Projeto' : 'Novo Projeto'}</h3>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                        <div>
                            <label>Título</label>
                            <input type="text" value={currentProject.title} onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })} required className="form-group input" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                        </div>
                        <div>
                            <label>Descrição</label>
                            <textarea value={currentProject.description} onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })} required rows={4} className="form-group textarea" style={{ width: '100%', padding: '10px', marginTop: '5px' }}></textarea>
                        </div>
                        <div>
                            <label>Tags (separadas por vírgula)</label>
                            <input type="text" placeholder="Ex: React, Node.js, AI" value={currentProject.tags} onChange={e => setCurrentProject({ ...currentProject, tags: e.target.value })} className="form-group input" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                        </div>
                        <div>
                            <label>Upload de Imagem</label>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} className="form-group input" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                        </div>
                        <div>
                            <label>Link Externo (Opcional)</label>
                            <input type="url" value={currentProject.link || ''} onChange={e => setCurrentProject({ ...currentProject, link: e.target.value })} className="form-group input" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                        </div>
                        <div>
                            <label>Link do Github (Opcional)</label>
                            <input type="url" value={currentProject.github || ''} onChange={e => setCurrentProject({ ...currentProject, github: e.target.value })} className="form-group input" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" id="highlighted" checked={currentProject.highlighted} onChange={e => setCurrentProject({ ...currentProject, highlighted: e.target.checked })} />
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
                            <th style={{ padding: '15px' }}>Imagem</th>
                            <th style={{ padding: '15px' }}>Título</th>
                            <th style={{ padding: '15px' }}>Tags</th>
                            <th style={{ padding: '15px' }}>Destacado</th>
                            <th style={{ padding: '15px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <td style={{ padding: '15px' }}>
                                    {project.image ? (
                                        <img src={`${pb.baseUrl}/api/files/${project.collectionId}/${project.id}/${project.image}?thumb=50x50`} alt={project.title} style={{ width: '40px', height: '40px', borderRadius: '5px', objectFit: 'cover' }} />
                                    ) : (
                                        <ImageIcon size={40} style={{ opacity: 0.3 }} />
                                    )}
                                </td>
                                <td style={{ padding: '15px' }}>{project.title}</td>
                                <td style={{ padding: '15px' }}>{project.tags}</td>
                                <td style={{ padding: '15px' }}>{project.highlighted ? 'Sim' : 'Não'}</td>
                                <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                                    <button onClick={() => { setIsEditing(true); setCurrentProject(project); setImageFile(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(project.id)} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {projects.length === 0 && <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum projeto cadastrado.</div>}
            </div>
        </div>
    );
};
