import React from 'react';

const Pricing = () => {

    const processPayment = (plan, amount) => {
        if (window.triggerPayment) {
            window.triggerPayment(plan, amount);
        } else {
            alert(`Processing payment for ${plan} plan: ₹${amount}`);
        }
    };

    return (
        <section id="pricing" className="pricing">
            <div style={{ padding: '80px 60px 0' }}>
                <div className="section-label reveal">Membership Plans</div>
                <h2 className="section-title reveal">INVEST IN<br /><span style={{ color: 'var(--red)' }}>YOURSELF</span></h2>
            </div>
            <div style={{ padding: '0 60px 80px' }}>
                <div className="pricing-grid reveal">
                    <div className="plan-card">
                        <div className="plan-label">1 Month</div>
                        <div className="plan-price" style={{ fontSize: '4rem' }}><sup>₹</sup>4,999</div>
                        <div className="plan-period">Monthly Package</div>
                        <ul className="plan-features">
                            <li>Gym Floor Access</li>
                            <li>Locker Room & Showers</li>
                            <li>FIT24 App Access</li>
                            <li>24/7 Gym Entry</li>
                        </ul>
                        <button className="btn-plan" onClick={() => processPayment('1 Month', 4999)}>Pay Now</button>
                    </div>
                    <div className="plan-card">
                        <div className="plan-label">3 Months</div>
                        <div className="plan-price" style={{ fontSize: '4rem' }}><sup>₹</sup>12,000</div>
                        <div className="plan-period">Quarterly Package</div>
                        <ul className="plan-features">
                            <li>Gym Floor Access</li>
                            <li>Locker Room & Showers</li>
                            <li>2 Group Classes/Month</li>
                            <li>FIT24 App Access</li>
                            <li>24/7 Gym Entry</li>
                        </ul>
                        <button className="btn-plan" onClick={() => processPayment('3 Months', 12000)}>Pay Now</button>
                    </div>
                    <div className="plan-card featured">
                        <div className="plan-label">⚡ 6 Months</div>
                        <div className="plan-price" style={{ fontSize: '4rem' }}><sup>₹</sup>22,999</div>
                        <div className="plan-period">Semi-Annual Package</div>
                        <ul className="plan-features">
                            <li>Unlimited Group Classes</li>
                            <li>1 PT Session/Month</li>
                            <li>Nutrition Consultation</li>
                            <li>Guest Pass (2/month)</li>
                            <li>Priority Class Booking</li>
                        </ul>
                        <button className="btn-plan" onClick={() => processPayment('6 Months', 22999)}>Pay Now</button>
                    </div>
                    <div className="plan-card">
                        <div className="plan-label">1 Year</div>
                        <div className="plan-price" style={{ fontSize: '4rem' }}><sup>₹</sup>39,999</div>
                        <div className="plan-period">Annual Package</div>
                        <ul className="plan-features">
                            <li>4 PT Sessions/Month</li>
                            <li>Custom Training Plan</li>
                            <li>Body Composition Analysis</li>
                            <li>Recovery Suite Access</li>
                            <li>Unlimited Guest Passes</li>
                        </ul>
                        <button className="btn-plan" onClick={() => processPayment('1 Year', 39999)}>Pay Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
