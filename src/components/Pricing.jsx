import React, { useState, useEffect } from 'react';

const Pricing = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/plans');
                const data = await res.json();
                setPlans(data);
            } catch (err) {
                console.error('Error fetching plans:', err);
            }
        };
        fetchPlans();
    }, []);

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
                    {plans.map((plan) => (
                        <div key={plan.id} className={`plan-card ${plan.is_featured ? 'featured' : ''}`}>
                            <div className="plan-label">{plan.is_featured ? '⚡ ' : ''}{plan.name}</div>
                            <div className="plan-price" style={{ fontSize: '4rem' }}><sup>₹</sup>{plan.price.toLocaleString()}</div>
                            <div className="plan-period">{plan.period}</div>
                            <ul className="plan-features">
                                {plan.features.split(',').map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <button className="btn-plan" onClick={() => processPayment(plan.name, plan.price)}>Pay Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
