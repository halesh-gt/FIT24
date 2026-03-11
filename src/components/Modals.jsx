import React from 'react';

const Modals = () => {

    const closeModals = () => {
        document.querySelectorAll('.modal-overlay').forEach(el => el.classList.remove('active'));
    };

    const switchModal = (modalId) => {
        closeModals();
        const el = document.getElementById(modalId);
        if (el) el.classList.add('active');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // placeholder logic
    };

    const handleRegister = (e) => {
        e.preventDefault();
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="modal-overlay" id="loginModal">
                <div className="modal-content">
                    <button className="modal-close" onClick={closeModals}>×</button>
                    <div className="modal-title">ACCESS PORTAL</div>
                    <div id="loginError" className="error-msg">Invalid email or password</div>
                    <form id="loginForm" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" id="loginEmail" required placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="loginPassword" required placeholder="Enter your password" />
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
                    <div id="registerError" className="error-msg">Email already registered</div>
                    <form id="registerForm" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" id="regName" required placeholder="Enter your full name" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" id="regEmail" required placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="regPassword" required placeholder="Create a password" />
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
                        {/* Plan details will be injected here */}
                    </div>
                    <form id="paymentForm" onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                            <label>Payment Method</label>
                            <select id="paymentMethod" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', fontFamily: 'inherit', outline: 'none', marginBottom: '16px', appearance: 'none', WebkitAppearance: 'none' }}>
                                <option value="" disabled selected style={{ color: '#000' }}>Select a payment method</option>
                                <option value="Card" style={{ color: '#000' }}>Credit / Debit Card</option>
                                <option value="UPI" style={{ color: '#000' }}>UPI</option>
                                <option value="COD" style={{ color: '#000' }}>Pay at Gym (COD)</option>
                            </select>
                        </div>
                        <button type="submit" className="modal-btn" id="confirmPaymentBtn">Confirm Payment</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modals;
