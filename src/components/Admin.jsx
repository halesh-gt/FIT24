import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Layout, UserPlus, Trash2, Edit2, LogOut, Activity, TrendingUp, DollarSign } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [plans, setPlans] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null);
    const [newTrainer, setNewTrainer] = useState({
        name: '',
        specialization: '',
        experience: '',
        certifications: '',
        image_url: '../public/img/trainer_1.png'
    });

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = () => {
        fetchUsers();
        fetchPayments();
        fetchPlans();
        fetchTrainers();
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/users`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (err) { console.error("Fetch Users Error:", err); }
    };

    const fetchPayments = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/payments`);
            if (res.ok) {
                const data = await res.json();
                setPayments(data);
            }
        } catch (err) { console.error("Fetch Payments Error:", err); }
    };

    const fetchPlans = async () => {
        try {
            const res = await fetch(`${API_URL}/plans`);
            if (res.ok) {
                const data = await res.json();
                setPlans(data);
            }
        } catch (err) { console.error("Fetch Plans Error:", err); }
    };

    const fetchTrainers = async () => {
        try {
            const res = await fetch(`${API_URL}/trainers`);
            if (res.ok) {
                const data = await res.json();
                setTrainers(data);
            }
        } catch (err) { console.error("Fetch Trainers Error:", err); }
    };

    const handleUpdatePlan = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/admin/plans/${editingPlan.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPlan)
            });
            setEditingPlan(null);
            fetchPlans();
        } catch (err) { console.error(err); }
    };

    const handleAddTrainer = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/admin/trainers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTrainer)
            });
            setNewTrainer({ name: '', specialization: '', experience: '', certifications: '', image_url: '../public/img/trainer_1.png' });
            fetchTrainers();
        } catch (err) { console.error(err); }
    };

    const handleDeleteTrainer = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await fetch(`${API_URL}/admin/trainers/${id}`, { method: 'DELETE' });
            fetchTrainers();
        } catch (err) { console.error(err); }
    };

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="sidebar-top">
                    <div className="admin-logo">
                        <span className="logo-accent">FIT</span>24 <span className="logo-tag">PRO</span>
                    </div>

                    <div className="admin-profile-card">
                        <div className="profile-avatar">A</div>
                        <div className="profile-info">
                            <span className="p-name">Administrator</span>
                            <span className="p-role">System Manager</span>
                        </div>
                    </div>
                </div>
                
                <nav className="admin-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        <Activity size={20} /> <span>Dashboard</span>
                    </button>
                    <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                        <Users size={20} /> <span>Registered Users</span>
                    </button>
                    <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>
                        <CreditCard size={20} /> <span>Memberships</span>
                    </button>
                    <button className={activeTab === 'plans' ? 'active' : ''} onClick={() => setActiveTab('plans')}>
                        <Layout size={20} /> <span>Gym Plans</span>
                    </button>
                    <button className={activeTab === 'trainers' ? 'active' : ''} onClick={() => setActiveTab('trainers')}>
                        <UserPlus size={20} /> <span>Trainers</span>
                    </button>
                </nav>

                <div className="sidebar-bottom">
                    <a href="/" className="back-link">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </a>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left">
                        <h1>{activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</h1>
                        <p className="header-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="header-right">
                        <button className="refresh-btn" onClick={fetchAllData}>Refresh Dashboard</button>
                    </div>
                </header>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-grid">
                            <div className="metrics-row">
                                <div className="metric-box">
                                    <div className="m-icon u"><Users size={24} /></div>
                                    <div className="m-data">
                                        <label>Total Members</label>
                                        <div className="m-value">{users.length}</div>
                                    </div>
                                </div>
                                <div className="metric-box">
                                    <div className="m-icon r"><DollarSign size={24} /></div>
                                    <div className="m-data">
                                        <label>Net Revenue</label>
                                        <div className="m-value">₹{totalRevenue.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="metric-box">
                                    <div className="m-icon s"><TrendingUp size={24} /></div>
                                    <div className="m-data">
                                        <label>Weekly Signups</label>
                                        <div className="m-value">{users.filter(u => new Date(u.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="activity-feed-grid">
                                <div className="admin-card activity-card">
                                    <div className="card-header-v2">
                                        <h3>Real-time Activities</h3>
                                        <div className="live-dot">LIVE</div>
                                    </div>
                                    <div className="activity-list-v2">
                                        {payments.length === 0 ? <p className="empty-msg">No activities recorded yet.</p> : 
                                            payments.slice(0, 7).sort((a,b) => new Date(b.created_at)-new Date(a.created_at)).map(p => (
                                                <div key={p.id} className="feed-item">
                                                    <div className="feed-icon"><CreditCard size={14} /></div>
                                                    <div className="feed-content">
                                                        <p><strong>{p.user_email}</strong> subscribed to <strong>{p.plan}</strong></p>
                                                        <span>{new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Recorded</span>
                                                    </div>
                                                    <div className="feed-price">+₹{p.amount.toLocaleString()}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="side-panels">
                                    <div className="admin-card info-card">
                                        <h4>Current Roster</h4>
                                        <div className="mini-roster">
                                            {trainers.map(t => (
                                                <div key={t.id} className="m-trainer">
                                                    <div className="m-t-avatar">{t.name.charAt(0)}</div>
                                                    <span>{t.name}</span>
                                                </div>
                                            ))}
                                            {trainers.length === 0 && <span>No trainers listed</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="admin-card table-section">
                            <div className="table-header-v2">
                                <h3>Member Management</h3>
                                <input type="text" placeholder="Search members..." className="search-input" />
                            </div>
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Contact Email</th>
                                        <th>Role</th>
                                        <th>Join Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td><span className="id-tag">#{u.id}</span></td>
                                            <td><strong>{u.username}</strong></td>
                                            <td>{u.email}</td>
                                            <td><span className={`role-tag ${u.role}`}>{u.role}</span></td>
                                            <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

                :root {
                    --admin-red: #e8251a;
                    --admin-yellow: #fde047;
                    --admin-bg: #000000;
                    --admin-card: #0a0a0a;
                    --admin-nav: #080808;
                    --admin-text: #ffffff;
                    --admin-muted: rgba(255,255,255,0.4);
                }

                .admin-container {
                    display: flex;
                    min-height: 100vh;
                    background: var(--admin-bg);
                    color: var(--admin-text);
                    font-family: 'Outfit', sans-serif;
                    width: 100vw;
                    margin: 0;
                    padding: 0;
                }

                /* SIDEBAR - Fixed Width and Visible */
                .admin-sidebar {
                    width: 250px;
                    background: var(--admin-nav);
                    border-right: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 1000;
                }

                .sidebar-top {
                    padding: 30px 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.02);
                }

                .admin-logo {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin-bottom: 25px;
                    text-align: center;
                }
                .logo-accent { color: var(--admin-red); }
                .logo-tag { font-size: 0.6rem; background: var(--admin-red); color: #000; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-left: 4px; }

                .admin-profile-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255,255,255,0.02);
                    padding: 12px;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.03);
                }

                .profile-avatar {
                    width: 32px;
                    height: 32px;
                    background: var(--admin-yellow);
                    color: #000;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                .profile-info { display: flex; flex-direction: column; min-width: 0; }
                .p-name { font-size: 0.8rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .p-role { font-size: 0.6rem; color: var(--admin-red); font-weight: 700; text-transform: uppercase; }

                .admin-nav {
                    padding: 20px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    flex: 1;
                }

                .admin-nav button {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 25px;
                    border: none;
                    background: transparent;
                    color: var(--admin-muted);
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    width: 100%;
                    position: relative;
                }

                .admin-nav button:hover {
                    color: var(--admin-text);
                    background: rgba(255,255,255,0.02);
                }

                .admin-nav button.active {
                    color: var(--admin-yellow);
                    background: rgba(253,224,71,0.03);
                }

                .admin-nav button.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 10%;
                    height: 80%;
                    width: 4px;
                    background: var(--admin-yellow);
                    border-radius: 0 4px 4px 0;
                    box-shadow: 2px 0 8px rgba(253,224,71,0.2);
                }

                .sidebar-bottom {
                    padding: 20px 25px;
                    border-top: 1px solid rgba(255,255,255,0.02);
                }

                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--admin-muted);
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: 0.3s;
                }
                .back-link:hover { color: var(--admin-red); }

                /* MAIN AREA */
                .admin-main {
                    flex: 1;
                    margin-left: 250px;
                    padding: 40px 50px;
                    background: var(--admin-bg);
                    min-height: 100vh;
                }

                .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .admin-header h1 { font-size: 2rem; font-weight: 700; }
                .header-date { color: var(--admin-muted); font-size: 0.9rem; }
                .refresh-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-size: 0.75rem; }

                .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .metric-box { background: var(--admin-card); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); display: flex; gap: 20px; align-items: center; }
                .m-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .m-icon.u { background: rgba(0,210,255,0.1); color: #00d2ff; }
                .m-icon.r { background: rgba(253,224,71,0.1); color: var(--admin-yellow); }
                .m-icon.s { background: rgba(232,37,26,0.1); color: var(--admin-red); }
                .m-data label { font-size: 0.7rem; color: var(--admin-muted); text-transform: uppercase; }
                .m-value { font-size: 1.5rem; font-weight: 700; }

                .activity-feed-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 20px; }
                .admin-card { background: var(--admin-card); padding: 30px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.03); }
                .card-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .live-dot { font-size: 0.6rem; background: rgba(76, 175, 80, 0.1); color: #4CAF50; padding: 2px 8px; border-radius: 4px; font-weight: 800; border: 1px solid rgba(76, 175, 80, 0.2); }
                
                .feed-item { display: flex; align-items: center; gap: 15px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.02); }
                .feed-icon { width: 32px; height: 32px; background: rgba(255,255,255,0.02); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--admin-muted); }
                .feed-content p { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin: 0; }
                .feed-price { margin-left: auto; color: #4CAF50; font-weight: 700; }

                .empty-msg { color: var(--admin-muted); font-size: 0.9rem; text-align: center; padding: 20px; }
            `}</style>
        </div>
    );
};

export default Admin;
