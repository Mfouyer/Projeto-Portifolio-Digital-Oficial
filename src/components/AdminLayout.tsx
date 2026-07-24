import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import { LayoutDashboard, LogOut, Code2, Presentation, Home, Mail, FileUp, ClipboardList } from 'lucide-react';

export const AdminLayout = () => {
    const location = useLocation();
    const isValidAdmin = pb.authStore.isValid && pb.authStore.isSuperuser;

    if (!isValidAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    const handleLogout = () => {
        pb.authStore.clear();
        window.location.href = '/admin/login';
    };

    return (
        <div className="admin-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'white' }}>
            {/* Sidebar */}
            <aside className="glass" style={{ width: '250px', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ marginBottom: '40px', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    Portfolio Admin
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'rgba(255,255,255,0.6)', marginBottom: '10px', fontSize: '0.9rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                        <Home size={18} /> Voltar ao Site
                    </Link>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px' }}></div>

                    <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/skills" className={`nav-link ${location.pathname === '/admin/skills' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                        <Code2 size={20} /> Serviços e Skills
                    </Link>
                    <Link to="/admin/projects" className={`nav-link ${location.pathname === '/admin/projects' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                        <Presentation size={20} /> Projetos
                    </Link>
                    <Link to="/admin/messages" className={`nav-link ${location.pathname === '/admin/messages' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                        <Mail size={20} /> Mensagens
                    </Link>
                    <Link to="/admin/cv" className={`nav-link ${location.pathname === '/admin/cv' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                        <FileUp size={20} /> Carregar CV
                    </Link>
                    <Link to="/admin/cv-requests" className={`nav-link ${location.pathname === '/admin/cv-requests' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                        <ClipboardList size={20} /> Pedidos de CV
                    </Link>
                </nav>

                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', borderRadius: '8px', textAlign: 'left' }}>
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};
