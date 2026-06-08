import { useState, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import { Users, Activity, Settings } from 'lucide-react';

export const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, activeConnections: 1 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Try to fetch users count using the users collection. 
                // If it fails (e.g., doesn't exist yet or not allowed), it defaults to 0
                const usersList = await pb.collection('users').getList(1, 1);
                setStats(prev => ({ ...prev, users: usersList.totalItems }));
            } catch (e) {
                console.warn("Could not fetch users count", e);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Dashboard Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div className="glass" style={{ padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)' }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>Total Users</h3>
                        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{stats.users}</p>
                    </div>
                </div>

                <div className="glass" style={{ padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: 'var(--secondary)' }}>
                        <Activity size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>System Status</h3>
                        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Online</p>
                    </div>
                </div>

                <div className="glass" style={{ padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(156, 163, 175, 0.1)', color: 'var(--text-muted)' }}>
                        <Settings size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>Configuration</h3>
                        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
