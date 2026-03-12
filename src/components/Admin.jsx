import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Layout, UserPlus, Trash2, Edit2, Save, X, Activity, TrendingUp, DollarSign, LogOut } from 'lucide-react';

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
            const data = await res.json();
            setUsers(data);
        } catch (err) { console.error(err); }
    };

    const fetchPayments = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/payments`);
            const data = await res.json();
            setPayments(data);
        } catch (err) { console.error(err); }
    };

    const fetchPlans = async () => {
        try {
            const res = await fetch(`${API_URL}/plans`);
            const data = await res.json();
            setPlans(data);
        } catch (err) { console.error(err); }
    };

    const fetchTrainers = async () => {
        try {
            const res = await fetch(`${API_URL}/trainers`);
            const data = await res.json();
            setTrainers(data);
        } catch (err) { console.error(err); }
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
        if (!window.confirm('Are you sure you want to remove this trainer?')) return;
        try {
            await fetch(`${API_URL}/admin/trainers/${id}`, { method: 'DELETE' });
            fetchTrainers();
        } catch (err) { console.error(err); }
    };

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
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
                
                <div className="sidebar-middle-spacer"></div>

                <div className="sidebar-footer">
                    <div className="footer-top">
                        <a href="/" className="back-link">
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </a>
                    </div>
                    
                    <nav className="admin-nav">
                        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                            <Activity size={18} /> <span>Dashboard</span>
                        </button>
                        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                            <Users size={18} /> <span>Registered Users</span>
                        </button>
                        <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>
                            <CreditCard size={18} /> <span>Memberships</span>
                        </button>
                        <button className={activeTab === 'plans' ? 'active' : ''} onClick={() => setActiveTab('plans')}>
                            <Layout size={18} /> <span>Gym Plans</span>
                        </button>
                        <button className={activeTab === 'trainers' ? 'active' : ''} onClick={() => setActiveTab('trainers')}>
                            <UserPlus size={18} /> <span>Trainers</span>
                        </button>
                    </nav>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left">
                        <h1>{activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
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
                                        {payments.slice(0, 7).sort((a,b) => new Date(b.created_at)-new Date(a.created_at)).map(p => (
                                            <div key={p.id} className="feed-item">
                                                <div className="feed-icon"><CreditCard size={14} /></div>
                                                <div className="feed-content">
                                                    <p><strong>{p.user_email}</strong> subscribed to <strong>{p.plan}</strong></p>
                                                    <span>{new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Recorded</span>
                                                </div>
                                                <div className="feed-price">+₹{p.amount.toLocaleString()}</div>
                                            </div>
                                        ))}
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
                                        </div>
                                    </div>
                                    <div className="admin-card info-card">
                                        <h4>Plan Overview</h4>
                                        <div className="popular-plans">
                                            {plans.map(p => (
                                                <div key={p.id} className="p-item">
                                                    <span>{p.name}</span>
                                                    <div className="p-bar"><div className="p-fill" style={{ width: '65%' }}></div></div>
                                                </div>
                                            ))}
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
                                        <th>Access Level</th>
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

                    {activeTab === 'payments' && (
                        <div className="admin-card table-section">
                            <div className="table-header-v2">
                                <h3>Transaction Log</h3>
                            </div>
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>Reference</th>
                                        <th>Customer</th>
                                        <th>Membership Plan</th>
                                        <th>Price</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map(p => (
                                        <tr key={p.id}>
                                            <td><span className="id-tag">#{p.id}</span></td>
                                            <td>{p.user_email}</td>
                                            <td><strong>{p.plan}</strong></td>
                                            <td><span className="price-bold">₹{p.amount.toLocaleString()}</span></td>
                                            <td>{new Date(p.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'plans' && (
                        <div className="plans-grid-v2">
                            {plans.map(plan => (
                                <div key={plan.id} className={`plan-card-v2 ${editingPlan?.id === plan.id ? 'editing' : ''}`}>
                                    {editingPlan && editingPlan.id === plan.id ? (
                                        <form onSubmit={handleUpdatePlan} className="plan-edit-form">
                                            <h3>Modify {plan.name}</h3>
                                            <div className="input-group-v2">
                                                <label>Title</label>
                                                <input type="text" value={editingPlan.name} onChange={e => setEditingPlan({...editingPlan, name: e.target.value})} />
                                            </div>
                                            <div className="input-group-v2">
                                                <label>Price (₹)</label>
                                                <input type="number" value={editingPlan.price} onChange={e => setEditingPlan({...editingPlan, price: e.target.value})} />
                                            </div>
                                            <div className="input-group-v2">
                                                <label>Features</label>
                                                <textarea value={editingPlan.features} onChange={e => setEditingPlan({...editingPlan, features: e.target.value})} rows="4"></textarea>
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="save-btn-v2">Apply Changes</button>
                                                <button type="button" className="cancel-btn-v2" onClick={() => setEditingPlan(null)}>Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="plan-content-v2">
                                            <div className="plan-head">
                                                <span className="plan-badge">{plan.period}</span>
                                                <button className="p-edit-btn" onClick={() => setEditingPlan(plan)}><Edit2 size={16} /></button>
                                            </div>
                                            <h4>{plan.name}</h4>
                                            <div className="p-price">₹{plan.price.toLocaleString()}</div>
                                            <ul className="p-features">
                                                {plan.features.split(',').map((f, i) => <li key={i}>{f}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'trainers' && (
                        <div className="trainers-grid-v2">
                            <div className="admin-card form-panel">
                                <h3>Add Expert Trainer</h3>
                                <form onSubmit={handleAddTrainer} className="pro-form">
                                    <div className="field">
                                        <label>Full Name</label>
                                        <input type="text" placeholder="e.g. Liam Smith" value={newTrainer.name} onChange={e => setNewTrainer({...newTrainer, name: e.target.value})} required />
                                    </div>
                                    <div className="field">
                                        <label>Specialty</label>
                                        <input type="text" placeholder="e.g. Cardio & Fat Loss" value={newTrainer.specialization} onChange={e => setNewTrainer({...newTrainer, specialization: e.target.value})} required />
                                    </div>
                                    <div className="field">
                                        <label>Experience Duration</label>
                                        <input type="text" placeholder="e.g. 5 YEARS EXP" value={newTrainer.experience} onChange={e => setNewTrainer({...newTrainer, experience: e.target.value})} required />
                                    </div>
                                    <div className="field">
                                        <label>Certifications</label>
                                        <textarea placeholder="e.g. CPR Certified, NASM" value={newTrainer.certifications} onChange={e => setNewTrainer({...newTrainer, certifications: e.target.value})} required rows="3"></textarea>
                                    </div>
                                    <button type="submit" className="pro-submit-btn">Register Trainer</button>
                                </form>
                            </div>

                            <div className="trainers-list-pro">
                                {trainers.map(t => (
                                    <div key={t.id} className="trainer-item-pro">
                                        <div className="t-avatar-pro">{t.name.charAt(0)}</div>
                                        <div className="t-info-pro">
                                            <h5>{t.name}</h5>
                                            <span>{t.specialization}</span>
                                        </div>
                                        <button className="del-btn" onClick={() => handleDeleteTrainer(t.id)}><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

                .admin-container {
                    display: flex;
                    min-height: 100vh;
                    background: #000;
                    color: #fff;
                    font-family: 'Outfit', sans-serif;
                }

                /* RESTRUCTURED SIDEBAR */
                .admin-sidebar {
                    width: 250px;
                    background: #080808;
                    border-right: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                    position: fixed;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    z-index: 1000;
                }

                .sidebar-header {
                    padding: 40px 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.02);
                    background: #000;
                }

                .admin-logo {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin-bottom: 30px;
                    text-align: center;
                    display: block;
                }
                .logo-accent { color: var(--red); }
                .logo-tag { font-size: 0.6rem; background: var(--red); color: #000; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-left: 4px; }

                .admin-profile-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255,255,255,0.02);
                    padding: 15px;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.03);
                }

                .profile-avatar {
                    width: 36px;
                    height: 36px;
                    background: var(--yellow);
                    color: #000;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                .profile-info {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }

                .p-name { font-size: 0.85rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .p-role { font-size: 0.65rem; color: var(--red); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

                .sidebar-middle-spacer {
                    flex: 1;
                }

                .sidebar-footer {
                    padding: 20px 0;
                    border-top: 1px solid rgba(255,255,255,0.02);
                    background: #080808;
                }

                .footer-top {
                    padding: 0 25px 20px 25px;
                    border-bottom: 1px solid rgba(255,255,255,0.02);
                    margin-bottom: 15px;
                }

                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: rgba(255,255,255,0.4);
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: 0.3s;
                }
                .back-link:hover { color: var(--red); }

                .admin-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    padding: 0;
                }

                .admin-nav button {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 25px;
                    border: none;
                    background: transparent;
                    color: rgba(255,255,255,0.5);
                    font-size: 0.95rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    width: 100%;
                    position: relative;
                }

                .admin-nav button:hover {
                    color: #fff;
                    background: rgba(255,255,255,0.02);
                }

                .admin-nav button.active {
                    color: var(--yellow);
                    background: rgba(253,224,71,0.03);
                }

                .admin-nav button.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 10%;
                    height: 80%;
                    width: 4px;
                    background: var(--yellow);
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    box-shadow: 2px 0 10px rgba(253,224,71,0.3);
                }

                /* MAIN AREA */
                .admin-main {
                    flex: 1;
                    margin-left: 250px;
                    padding: 40px 50px;
                    background: #000;
                    min-height: 100vh;
                }

                /* OTHER STYLES PRESERVED */
                .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .admin-header h1 { font-size: 2rem; font-weight: 700; margin: 0; }
                .header-date { color: rgba(255,255,255,0.3); font-size: 0.9rem; margin-top: 4px; }
                .refresh-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-size: 0.8rem; }

                /* DASHBOARD CARDS */
                .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .metric-box { background: #111; padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); display: flex; gap: 20px; align-items: center; }
                .m-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .m-icon.u { background: rgba(0,210,255,0.1); color: #00d2ff; }
                .m-icon.r { background: rgba(253,224,71,0.1); color: var(--yellow); }
                .m-icon.s { background: rgba(232,37,26,0.1); color: var(--red); }
                .m-data label { font-size: 0.75rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.4px; }
                .m-value { font-size: 1.6rem; font-weight: 700; margin-top: 2px; }

                .activity-feed-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 20px; }
                .admin-card { background: #111; padding: 30px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.03); }
                .card-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .live-dot { font-size: 0.6rem; background: rgba(76, 175, 80, 0.1); color: #4CAF50; padding: 2px 8px; border-radius: 4px; font-weight: 800; border: 1px solid rgba(76, 175, 80, 0.2); }
                
                .activity-list-v2 { display: flex; flex-direction: column; gap: 15px; }
                .feed-item { display: flex; align-items: center; gap: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.02); }
                .feed-icon { width: 34px; height: 34px; background: rgba(255,255,255,0.02); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); }
                .feed-content p { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin: 0; }
                .feed-content strong { color: #fff; }
                .feed-content span { font-size: 0.75rem; color: rgba(255,255,255,0.2); }
                .feed-price { margin-left: auto; color: #4CAF50; font-weight: 700; font-size: 0.95rem; }

                .side-panels { display: flex; flex-direction: column; gap: 20px; }
                .info-card h4 { font-size: 0.9rem; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 20px; font-weight: 600; letter-spacing: 0.5px; }
                .mini-roster { display: flex; flex-wrap: wrap; gap: 10px; }
                .m-trainer { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.02); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.03); }
                .m-t-avatar { width: 20px; height: 20px; background: var(--red); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 900; }
                .popular-plans { display: flex; flex-direction: column; gap: 15px; }
                .p-item { display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; }
                .p-bar { height: 4px; background: rgba(255,255,255,0.03); border-radius: 2px; }
                .p-fill { height: 100%; background: var(--yellow); border-radius: 2px; opacity: 0.8; }

                /* TABLES */
                .table-section { padding: 40px; }
                .table-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .search-input { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 12px 20px; border-radius: 12px; color: #fff; width: 280px; outline: none; transition: 0.3s; }
                .search-input:focus { border-color: var(--yellow); background: rgba(255,255,255,0.05); }
                .pro-table { width: 100%; border-collapse: collapse; }
                .pro-table th { text-align: left; padding: 15px; font-size: 0.7rem; color: rgba(255,255,255,0.3); text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); letter-spacing: 0.5px; }
                .pro-table td { padding: 20px 15px; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.9rem; }
            `}</style>
        </div>
    );
};

export default Admin;
