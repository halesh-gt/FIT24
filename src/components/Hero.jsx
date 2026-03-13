import React from 'react';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="ticker">FIT24</div>
            <div className="hero-content">
                <h1 className="hero-title">
                    TRAIN<br />
                    <span className="outline">WITHOUT</span><br />
                    <span className="red">LIMITS</span>
                </h1>
                <p className="hero-sub">Elite fitness facility built for those who refuse to settle. World-class equipment, expert coaching, zero excuses.</p>
                <div className="hero-actions">
                    <a href="#pricing" className="btn-primary">Start Free Trial</a>
                    <a href="#classes" className="btn-ghost">Explore Classes →</a>
                </div>
            </div>
            <div className="hero-stats">
                <div className="stat">
                    <div className="stat-num">12<span>K+</span></div>
                    <div className="stat-label">Members</div>
                </div>
                <div className="stat">
                    <div className="stat-num">48<span>+</span></div>
                    <div className="stat-label">Classes/Week</div>
                </div>
                <div className="stat">
                    <div className="stat-num">FULL</div>
                    <div className="stat-label">Access</div>
                </div>
            </div>
            <div className="scroll-hint">
                <div className="scroll-line"></div>
                Scroll
            </div>
        </section>
    );
};

export default Hero;
