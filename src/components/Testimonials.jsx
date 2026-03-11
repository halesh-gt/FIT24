import React from 'react';

const Testimonials = () => {
    return (
        <section style={{ padding: '120px 60px' }}>
            <div className="section-label reveal">Real Results</div>
            <h2 className="section-title reveal">MEMBERS<br /><span style={{ color: 'var(--red)' }}>SPEAK</span></h2>
            <div className="testi-grid reveal">
                <div className="testi-card">
                    <div className="testi-quote">FIT24 completely changed my relationship with fitness. The coaches push you just enough, the vibe is electric, and the 24/7 access fits my crazy schedule perfectly.</div>
                    <div className="testi-author">
                        <div className="testi-avatar">R</div>
                        <div>
                            <div className="testi-name">Rohan Mehta</div>
                            <div className="testi-meta">Member since 2022 · Lost 18kg</div>
                        </div>
                    </div>
                </div>
                <div className="testi-card">
                    <div className="testi-quote">I've been to gyms across the city. Nothing compares. The equipment is premium, the classes are genuinely challenging, and the community keeps you accountable.</div>
                    <div className="testi-author">
                        <div className="testi-avatar">P</div>
                        <div>
                            <div className="testi-name">Priya Sharma</div>
                            <div className="testi-meta">Member since 2021 · Ran first marathon</div>
                        </div>
                    </div>
                </div>
                <div className="testi-card">
                    <div className="testi-quote">The boxing classes alone are worth it. Marcus is a world-class trainer and the midnight sessions when I finish late work are a lifesaver. 10/10 no questions.</div>
                    <div className="testi-author">
                        <div className="testi-avatar">A</div>
                        <div>
                            <div className="testi-name">Arjun Nair</div>
                            <div className="testi-meta">Member since 2023 · Boxing champion</div>
                        </div>
                    </div>
                </div>
                <div className="testi-card">
                    <div className="testi-quote">As a working mom, I needed flexibility. FIT24 gives me that and more — great childcare hours, fast classes, and results I never thought possible in my 40s.</div>
                    <div className="testi-author">
                        <div className="testi-avatar">S</div>
                        <div>
                            <div className="testi-name">Sneha Kapoor</div>
                            <div className="testi-meta">Member since 2022 · Gained strength +40%</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
