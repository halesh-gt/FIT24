import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminReset = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setInfo('');

        const storedOtp = sessionStorage.getItem('adminOtp');
        if (!storedOtp) {
            setError('OTP has expired or was not requested. Please use "Forgot password" again.');
            return;
        }
        if (otp.trim() !== storedOtp) {
            setError('Invalid OTP. Please check the code sent to your email.');
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            setError('New password should be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('adminPassword', newPassword);
            sessionStorage.removeItem('adminOtp');
            setLoading(false);
            setInfo('Password updated successfully. Redirecting to login...');
            setTimeout(() => {
                navigate('/admin-login');
            }, 1200);
        }, 400);
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <img src="/img/logo.png" alt="FIT24" className="admin-login-logo" />
                <h1>Reset Admin Password</h1>
                <p className="admin-login-sub">
                    Enter the OTP sent to your email and choose a new password.
                </p>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <label>
                        OTP Code
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            required
                        />
                    </label>
                    <label>
                        New Password
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                    </label>
                    <label>
                        Confirm New Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                        />
                    </label>

                    {error && <div className="admin-login-error">{error}</div>}
                    {info && <div className="admin-login-info">{info}</div>}

                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>

                <button
                    type="button"
                    className="admin-forgot-link"
                    onClick={() => navigate('/admin-login')}
                    disabled={loading}
                >
                    Back to login
                </button>
            </div>
        </div>
    );
};

export default AdminReset;

