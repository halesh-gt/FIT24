import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Layout, UserPlus, Trash2, Edit2, Save, X, Activity, TrendingUp, DollarSign, LogOut, ClipboardList, Menu } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [plans, setPlans] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null);
    const [memberRegistrations, setMemberRegistrations] = useState([]);
    const [chatbotLeads, setChatbotLeads] = useState([]);
    const [newTrainer, setNewTrainer] = useState({
        name: '',
        specialization: '',
        experience: '',
        certifications: '',
        image_url: '../public/img/trainer_1.png'
    });

    const API_URL = `http://${window.location.hostname}:5000/api`;

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = () => {
        fetchUsers();
        fetchPayments();
        fetchPlans();
        fetchTrainers();
        fetchMemberRegistrations();
        fetchChatbotLeads();
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

    const fetchMemberRegistrations = async () => {
        try {
            const res = await fetch(`${API_URL}/member-registrations`);
            const data = await res.json();
            setMemberRegistrations(data);
        } catch (err) { console.error(err); }
    };
    
    const fetchChatbotLeads = async () => {
        try {
            const res = await fetch(`${API_URL}/chatbot-leads`);
            const data = await res.json();
            setChatbotLeads(data);
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
        if (!window.confirm('Are you sure?')) return;
        try {
            await fetch(`${API_URL}/admin/trainers/${id}`, { method: 'DELETE' });
            fetchTrainers();
        } catch (err) { console.error(err); }
    };

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className={`admin-container ${isSidebarOpen ? 'sidebar-active' : ''}`}>
            {/* Mobile Overlay */}
            {isSidebarOpen && <div className="admin-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-top">
                    <div className="admin-logo-brand">
                        <img src="/img/logo.png" alt="FIT24" className="admin-side-logo" />
                    </div>

                    <div className="admin-profile-card">
                        <div className="profile-avatar">A</div>
                        <div className="profile-info">
                            <span className="p-name">Administrator</span>
                            <span className="p-role">System Manager</span>
                        </div>
                    </div>
                </div>
                
                <nav className="admin-nav-sidebar">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}>
                        <Activity size={20} /> <span>Dashboard</span>
                    </button>
                 
                    <button className={activeTab === 'whatsappLeads' ? 'active' : ''} onClick={() => { setActiveTab('whatsappLeads'); setIsSidebarOpen(false); }}>
                        <Activity size={20} style={{ color: '#25D366' }} /> <span>WhatsApp Leads</span>
                    </button> 
                   
                    
                    
                    <button className={activeTab === 'memberForms' ? 'active' : ''} onClick={() => { setActiveTab('memberForms'); setIsSidebarOpen(false); }}>
                        <ClipboardList size={20} /> <span>Member Forms</span>
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
                        <button className="mobile-toggle" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1>{activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</h1>
                            <p className="header-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
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
                    {activeTab === 'memberForms' && (
                        <div className="admin-card table-section">
                            <div className="table-header-v2">
                                <h3>Membership Registration Forms</h3>
                                <p className="table-subtitle">Recent signups with digital signatures</p>
                            </div>
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Email / Phone</th>
                                        <th>DOB</th>
                                        <th>Address</th>
                                        <th>Signature</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {memberRegistrations.map(reg => (
                                        <tr key={reg.id}>
                                            <td className="date-cell">
                                                <span className="d-date">{new Date(reg.created_at).toLocaleDateString()}</span>
                                                <span className="d-time">{new Date(reg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                            </td>
                                            <td><strong>{reg.name}</strong></td>
                                            <td>
                                                <div className="contact-info">
                                                    <span>{reg.email}</span>
                                                    <span className="sub-text">{reg.primary_phone}</span>
                                                </div>
                                            </td>
                                            <td>{new Date(reg.dob).toLocaleDateString()}</td>
                                            <td className="address-cell">{reg.address}</td>
                                            <td>
                                                {reg.signature && (
                                                    <div className="signature-preview">
                                                        <img src={reg.signature} alt="Signature" onClick={() => window.open(reg.signature, '_blank')} />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {memberRegistrations.length === 0 && (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.2)' }}>
                                                No membership registrations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'whatsappLeads' && (
                        <div className="admin-card table-section">
                            <div className="table-header-v2">
                                <h3 style={{ color: '#25D366' }}>WhatsApp Enquiries</h3>
                                <p className="table-subtitle">Leads captured via the floating WhatsApp button</p>
                            </div>
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chatbotLeads.map(lead => (
                                        <tr key={lead.id}>
                                            <td className="date-cell">
                                                <span className="d-date">{new Date(lead.created_at).toLocaleDateString()}</span>
                                                <span className="d-time">{new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                            </td>
                                            <td><strong>{lead.name}</strong></td>
                                            <td>{lead.email}</td>
                                            <td>{lead.phone}</td>
                                            <td>
                                                <span style={{ fontSize: '0.7rem', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '4px 10px', borderRadius: '4px', fontWeight: '800' }}>SENT</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {chatbotLeads.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.2)' }}>
                                                No WhatsApp enquiries found.
                                            </td>
                                        </tr>
                                    )}
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
                    background: var(--admin-bg) !important;
                    color: var(--admin-text) !important;
                    font-family: 'Outfit', sans-serif !important;
                    width: 100vw;
                    margin: 0;
                    padding: 0;
                    position: relative;
                }

                /* SIDEBAR - Isolated from global nav */
                .admin-sidebar {
                    width: 250px;
                    background: var(--admin-nav) !important;
                    border-right: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    position: fixed !important;
                    left: 0;
                    top: 0;
                    z-index: 2000;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                .sidebar-top {
                    padding: 30px 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.02);
                }

                .admin-logo-brand {
                    margin-bottom: 30px;
                    text-align: left;
                }

                .admin-side-logo {
                    width: 100%;
                    max-width: 180px;
                    height: auto;
                    display: block;
                }

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

                .admin-nav-sidebar {
                    padding: 10px 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start !important;
                    gap: 4px;
                    flex: 1;
                    /* Reset global nav interference */
                    position: static !important;
                    background: transparent !important;
                    width: 100% !important;
                }

                .admin-nav-sidebar button {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 25px;
                    border: none;
                    background: transparent !important;
                    color: var(--admin-muted) !important;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    width: 100%;
                    position: relative;
                }

                .admin-nav-sidebar button:hover {
                    color: var(--admin-text) !important;
                    background: rgba(255,255,255,0.02) !important;
                }

                .admin-nav-sidebar button.active {
                    color: var(--admin-yellow) !important;
                    background: rgba(253,224,71,0.03) !important;
                }

                .admin-nav-sidebar button.active::before {
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
                    color: var(--admin-muted) !important;
                    text-decoration: none !important;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: 0.3s;
                }
                .back-link:hover { color: var(--admin-red) !important; }

                /* MAIN AREA */
                .admin-main {
                    flex: 1;
                    margin-left: 250px !important;
                    padding: 40px 50px;
                    background: var(--admin-bg) !important;
                    min-height: 100vh;
                    position: relative;
                }

                .admin-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 40px;
                    padding: 0 !important;
                    background: transparent !important;
                }
                .header-left { 
                    display: flex; 
                    align-items: center; 
                    gap: 15px; 
                }

                .mobile-toggle {
                    display: none;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 8px;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .admin-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.7);
                    backdrop-filter: blur(4px);
                    z-index: 1999;
                }

                .admin-header h1 { font-size: 2rem; font-weight: 700; color: #fff; margin: 0; }
                .header-date { color: var(--admin-muted); font-size: 0.9rem; margin-top: 5px; }
                .refresh-btn { 
                    background: rgba(255,255,255,0.05) !important; 
                    border: 1px solid rgba(255,255,255,0.1) !important; 
                    color: #fff !important; 
                    padding: 10px 18px !important; 
                    border-radius: 8px !important; 
                    cursor: pointer; 
                    font-size: 0.75rem; 
                }

                .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .metric-box { background: var(--admin-card); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); display: flex; gap: 20px; align-items: center; }
                .m-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .m-icon.u { background: rgba(0,210,255,0.1); color: #00d2ff; }
                .m-icon.r { background: rgba(253,224,71,0.1); color: var(--admin-yellow); }
                .m-icon.s { background: rgba(232,37,26,0.1); color: var(--admin-red); }
                .m-data label { font-size: 0.7rem; color: var(--admin-muted); text-transform: uppercase; }
                .m-value { font-size: 1.5rem; font-weight: 700; color: #fff; }

                .activity-feed-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 20px; }
                .admin-card { background: var(--admin-card); padding: 30px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.03); }
                .card-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .live-dot { font-size: 0.6rem; background: rgba(76, 175, 80, 0.1); color: #4CAF50; padding: 2px 8px; border-radius: 4px; font-weight: 800; border: 1px solid rgba(76, 175, 80, 0.2); }
                
                .feed-item { display: flex; align-items: center; gap: 15px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.02); }
                .feed-icon { width: 32px; height: 32px; background: rgba(255,255,255,0.02); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--admin-muted); }
                .feed-content p { font-size: 0.85rem; color: rgba(255,255,255,0.6) !important; margin: 0; }
                .feed-price { margin-left: auto; color: #4CAF50; font-weight: 700; }

                .side-panels { display: flex; flex-direction: column; gap: 20px; }
                .info-card h4 { font-size: 0.9rem; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 20px; font-weight: 600; letter-spacing: 0.5px; }
                .mini-roster { display: flex; flex-wrap: wrap; gap: 10px; }
                .m-trainer { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.02); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.03); }
                .m-t-avatar { width: 20px; height: 20px; background: var(--admin-red); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 900; }
                
                /* TABLES */
                .table-section { padding: 40px; }
                .table-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .search-input { background: rgba(255,255,255,0.03) !important; border: 1px solid rgba(255,255,255,0.1) !important; padding: 12px 20px !important; border-radius: 12px !important; color: #fff !important; width: 280px !important; outline: none; transition: 0.3s; }
                .search-input:focus { border-color: var(--admin-yellow) !important; background: rgba(255,255,255,0.05) !important; }
                .pro-table { width: 100%; border-collapse: collapse; }
                .pro-table th { text-align: left; padding: 15px; font-size: 0.7rem; color: rgba(255,255,255,0.3) !important; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); letter-spacing: 0.5px; }
                .pro-table td { padding: 20px 15px; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.9rem; color: #eee; }
                
                /* Specialized Member Forms Styles */
                .table-subtitle { font-size: 0.8rem; color: rgba(255,255,255,0.3) !important; margin-top: -20px; margin-bottom: 20px; }
                .date-cell { display: flex; flex-direction: column; gap: 4px; }
                .d-date { font-weight: 600; color: #fff; }
                .d-time { font-size: 0.75rem; color: rgba(255,255,255,0.3); }
                .contact-info { display: flex; flex-direction: column; gap: 2px; }
                .sub-text { font-size: 0.8rem; color: rgba(255,255,255,0.4); }
                .address-cell { max-width: 200px; white-space: normal; line-height: 1.4; font-size: 0.8rem; color: rgba(255,255,255,0.6); }
                .signature-preview { width: 100px; height: 50px; background: rgba(255,255,255,0.02); border-radius: 6px; padding: 4px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; cursor: zoom-in; }
                .signature-preview img { width: 100%; height: 100%; object-fit: contain; filter: invert(1) brightness(2); }
                .empty-msg { color: var(--admin-muted); font-size: 0.9rem; text-align: center; padding: 20px; }
            /* =========================
   RESPONSIVE DESIGN
   ========================= */

/* Tablets & Small Laptops */
@media (max-width: 1024px) {

    .admin-main {
        padding: 30px 25px;
    }

    .metrics-row {
        grid-template-columns: repeat(2, 1fr);
    }

    .activity-feed-grid {
        grid-template-columns: 1fr;
    }

    .search-input {
        width: 200px !important;
    }

}


/* Mobile Devices */
@media (max-width: 992px) {

    .mobile-toggle {
        display: flex;
    }

    .admin-sidebar {
        position: fixed !important;
        left: -250px !important;
        width: 250px !important;
        transition: left 0.3s ease !important;
        box-shadow: 20px 0 50px rgba(0,0,0,0.5);
    }

    .admin-sidebar.open {
        left: 0 !important;
    }

    .admin-main {
        margin-left: 0 !important;
        padding: 30px 20px;
    }

    .metrics-row {
        grid-template-columns: repeat(2, 1fr);
    }

    .admin-header h1 {
        font-size: 1.4rem;
    }

}


/* Small Phones */
@media (max-width: 600px) {

    .metrics-row {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .admin-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .header-right, .refresh-btn {
        width: 100%;
    }

    .admin-main {
        padding: 20px 15px;
    }

}


/* Tables Scroll on Mobile */
@media (max-width: 768px) {

    .pro-table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }

}`}
            </style>
        </div>
    );
};


export default Admin;
