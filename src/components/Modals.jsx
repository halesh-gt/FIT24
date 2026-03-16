import React, { useState, useEffect } from 'react';

const Modals = () => {
    // Form States
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');

    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regError, setRegError] = useState('');
    const [regSuccess, setRegSuccess] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({ plan: '', amount: 0 });

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('fit24_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        window.triggerPayment = (plan, amount) => {
            setPaymentDetails({ plan, amount });
            switchModal('paymentModal');
        };
        return () => {
            delete window.triggerPayment;
        }
    }, []);

    const closeModals = () => {
        document.querySelectorAll('.modal-overlay').forEach(el => el.classList.remove('active'));
    };

    const switchModal = (modalId) => {
        closeModals();

        // Reset states
        setLoginError(''); setLoginSuccess('');
        setRegError(''); setRegSuccess('');
        setPaymentError(''); setPaymentSuccess('');

        const el = document.getElementById(modalId);
        if (el) el.classList.add('active');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginSuccess('');
        try {
            const res = await fetch(`http://${window.location.hostname}:5000/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });
            const data = await res.json();
            if (res.ok) {
                setLoginSuccess(data.message);
                setUser(data.user);
                localStorage.setItem('fit24_user', JSON.stringify(data.user));
                window.dispatchEvent(new Event('userUpdate'));
                
                setTimeout(() => {
                    closeModals();
                    setLoginSuccess('');
                }, 1500);
            } else {
                setLoginError(data.message);
            }
        } catch (err) {
            setLoginError('Failed to connect to server.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegError('');
        setRegSuccess('');
        try {
            const res = await fetch(`http://${window.location.hostname}:5000/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: regUsername, email: regEmail, phone: regPhone, password: regPassword })
            });
            const data = await res.json();
            if (res.ok) {
                setRegSuccess(data.message);
                setTimeout(() => {
                    switchModal('loginModal');
                }, 1500);
            } else {
                setRegError(data.message);
            }
        } catch (err) {
            setRegError('Failed to connect to server.');
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentError('');
        setPaymentSuccess('');

        if (!user) {
            setPaymentError('You must be logged in to make a payment.');
            setTimeout(() => switchModal('loginModal'), 2000);
            return;
        }

        if (!paymentMethod) {
            setPaymentError('Please select a payment method.');
            return;
        }

        try {
            const res = await fetch(`http://${window.location.hostname}:5000/api/payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: user.email,
                    plan: paymentDetails.plan,
                    amount: paymentDetails.amount,
                    paymentMethod
                })
            });
            const data = await res.json();
            if (res.ok) {
                setPaymentSuccess(data.message);
                setTimeout(() => {
                    closeModals();
                    setPaymentSuccess('');
                }, 2000);
            } else {
                setPaymentError(data.message);
            }
        } catch (err) {
            setPaymentError('Failed to connect to server.');
        }
    };

    return (
        <>
            <div className="modal-overlay" id="loginModal">
                <div className="modal-content">
                    <button className="modal-close" onClick={closeModals}>×</button>
                    <div className="modal-title">ACCESS PORTAL</div>
                    {loginError && <div className="error-msg" style={{ display: 'block' }}>{loginError}</div>}
                    {loginSuccess && <div className="success-msg" style={{ color: '#4CAF50', marginBottom: '15px' }}>{loginSuccess}</div>}
                    <form id="loginForm" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required placeholder="Enter your password" />
                        </div>
                        <button type="submit" className="modal-btn">Sign In</button>
                    </form>
                    <div className="modal-switch">
                        New to FIT24? <button type="button" onClick={() => switchModal('registerModal')}>Create Account</button>
                    </div>
                </div>
            </div>

            <div className="modal-overlay" id="registerModal">
                <div className="modal-content">
                    <button className="modal-close" onClick={closeModals}>×</button>
                    <div className="modal-title">JOIN THE ELITE</div>
                    {regError && <div className="error-msg" style={{ display: 'block' }}>{regError}</div>}
                    {regSuccess && <div className="success-msg" style={{ color: '#4CAF50', marginBottom: '15px' }}>{regSuccess}</div>}
                    <form id="registerForm" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required placeholder="Choose a username" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} required placeholder="Enter your phone number" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required placeholder="Create a password" />
                        </div>
                        <button type="submit" className="modal-btn">Register</button>
                    </form>
                    <div className="modal-switch">
                        Already a member? <button type="button" onClick={() => switchModal('loginModal')}>Sign In</button>
                    </div>
                </div>
            </div>

            <div className="modal-overlay" id="paymentModal">
                <div className="modal-content">
                    <button className="modal-close" onClick={closeModals}>×</button>
                    <div className="modal-title">CHECKOUT</div>
                    <div id="paymentPlanDetails" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {paymentDetails.plan ? (
                            <>
                                <strong>Plan:</strong> {paymentDetails.plan} <br />
                                <strong>Amount:</strong> ₹{paymentDetails.amount.toLocaleString()}
                            </>
                        ) : 'Select a plan to proceed.'}
                    </div>
                    {paymentError && <div className="error-msg" style={{ display: 'block' }}>{paymentError}</div>}
                    {paymentSuccess && <div className="success-msg" style={{ color: '#4CAF50', marginBottom: '15px' }}>{paymentSuccess}</div>}
                    <form id="paymentForm" onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                            <label>Payment Method</label>
                            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', fontFamily: 'inherit', outline: 'none', marginBottom: '16px', appearance: 'none', WebkitAppearance: 'none' }}>
                                <option value="" disabled style={{ color: '#000' }}>Select a payment method</option>
                                <option value="Card" style={{ color: '#000' }}>Credit / Debit Card</option>
                                <option value="UPI" style={{ color: '#000' }}>UPI</option>
                                <option value="COD" style={{ color: '#000' }}>Pay at Gym (COD)</option>
                            </select>
                        </div>
                        <button type="submit" className="modal-btn" id="confirmPaymentBtn" disabled={!paymentDetails.plan}>Confirm Payment</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modals;
