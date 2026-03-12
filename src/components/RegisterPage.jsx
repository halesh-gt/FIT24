import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, phone, password })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess(data.message);
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to connect to server.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'var(--black)'
        }}>
            <div className="modal-content" style={{ position: 'relative', transform: 'none', borderTop: '3px solid var(--red)' }}>
                <div className="modal-title">JOIN THE ELITE</div>
                {error && <div className="error-msg" style={{ display: 'block' }}>{error}</div>}
                {success && <div className="success-msg" style={{ color: '#4CAF50', marginBottom: '15px' }}>{success}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Choose a username" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Enter your phone number" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Create a password" />
                    </div>
                    <button type="submit" className="modal-btn">Register</button>
                </form>
                <div className="modal-switch" style={{ textAlign: 'center', marginTop: '15px' }}>
                    <button type="button" onClick={() => navigate('/')} style={{ color: 'var(--muted)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
