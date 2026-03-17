import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const ADMIN_NAME = 'fit24admin';
    const DEFAULT_PASSWORD = 'Fit24@Admin123';
    const storedPassword =
        typeof window !== 'undefined'
            ? localStorage.getItem('adminPassword') || DEFAULT_PASSWORD
            : DEFAULT_PASSWORD;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            if (name !== ADMIN_NAME || password !== storedPassword) {
                setError('Invalid admin name or password');
                setLoading(false);
                return;
            }
            localStorage.setItem('isAdminAuthed', 'true');
            setLoading(false);
            navigate('/admin');
        }, 300);
    };

    const handleForgot = () => {
        setError('');
        setLoading(true);
        const otp = Math.floor(100000 + Math.random() * 900000);
        sessionStorage.setItem('adminOtp', otp.toString());
        console.log('Admin OTP (dev only, no email):', otp);
        setTimeout(() => {
            setLoading(false);
            navigate('/admin-reset');
        }, 400);
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <img src="/img/logo.png" alt="FIT24" className="admin-login-logo" />
                <h1>Admin Login</h1>
                <p className="admin-login-sub">Secure access to FIT24 control panel</p>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <label>
                        Admin Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter admin name"
                            required
                        />
                    </label>
                    <label>
                        Password
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? 'Hide' : 'View'}
                            </button>
                        </div>
                    </label>

                    {error && <div className="admin-login-error">{error}</div>}

                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? 'Please wait...' : 'Login'}
                    </button>
                </form>

                <button
                    type="button"
                    className="admin-forgot-link"
                    onClick={handleForgot}
                    disabled={loading}
                >
                    Forgot password? Send OTP to admin email
                </button>
            </div>

            <style>{`
                .admin-login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle at top, #18181b, #000000);
                    font-family: 'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    color: #fff;
                }
                .admin-login-card {
                    width: 100%;
                    max-width: 420px;
                    background: rgba(12,12,12,0.95);
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 32px 28px;
                    box-shadow: 0 24px 80px rgba(0,0,0,0.7);
                    text-align: center;
                }
                .admin-login-logo {
                    width: 160px;
                    margin-bottom: 20px;
                }
                .admin-login-card h1 {
                    font-size: 1.7rem;
                    margin-bottom: 4px;
                }
                .admin-login-sub {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 24px;
                }
                .admin-login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    text-align: left;
                }
                .admin-login-form label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: rgba(255,255,255,0.6);
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .admin-login-form input {
                    background: rgba(24,24,27,0.9);
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px 12px;
                    color: #fff;
                    font-size: 0.9rem;
                    outline: none;
                }
                .admin-login-form input:focus {
                    border-color: #e8251a;
                    box-shadow: 0 0 0 1px rgba(232,37,26,0.4);
                }
                .password-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .password-wrapper input {
                    width: 100%;
                    padding-right: 70px;
                }
                .password-toggle {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.75rem;
                    font-weight: 500;
                    cursor: pointer;
                }
                .admin-login-error {
                    margin-top: 6px;
                    padding: 8px 10px;
                    border-radius: 10px;
                    background: rgba(239,68,68,0.1);
                    border: 1px solid rgba(239,68,68,0.3);
                    color: #fecaca;
                    font-size: 0.8rem;
                }
                .admin-login-btn {
                    margin-top: 12px;
                    width: 100%;
                    padding: 10px 14px;
                    border-radius: 999px;
                    border: none;
                    background: linear-gradient(135deg, #e8251a, #f97316);
                    color: #fff;
                    font-weight: 600;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: transform 0.1s, box-shadow 0.1s, opacity 0.1s;
                }
                .admin-login-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 14px 40px rgba(0,0,0,0.7);
                }
                .admin-login-btn:disabled {
                    opacity: 0.7;
                    cursor: default;
                }
                .admin-forgot-link {
                    margin-top: 14px;
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.8rem;
                    text-decoration: underline;
                    cursor: pointer;
                }
                .admin-forgot-link:hover:not(:disabled) {
                    color: #e5e5e5;
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;

