import React from 'react';

const About = () => {
    return (
        <section id="about" style={{ padding: '120px 60px' }}>
            <div className="about reveal">
                <div className="about-visual">
                    <div className="about-visual-inner">
                        <div className="about-visual-text">FIT</div>
                    </div>
                    <div className="about-badge">
                        <div className="about-badge-num">2019</div>
                        <div className="about-badge-text">Est. in the city</div>
                    </div>
                </div>
                <div className="about-text">
                    <div className="section-label">About FIT24</div>
                    <h2 className="section-title">MORE THAN<br />A <span style={{ color: 'var(--red)' }}>GYM</span></h2>
                    <p>FIT24 was built on a simple belief — that access to elite training shouldn't be a privilege. We created a space where beginners and professionals train side by side, fueled by the same fire.</p>
                    <p>From cutting-edge equipment to world-class coaches, every detail is engineered to unlock your best performance — day or night.</p>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon"><i className="fa-solid fa-dumbbell"></i></div>
                            <div className="feature-name">Elite Equipment</div>
                            <div className="feature-desc">500+ machines from top brands</div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><i className="fa-solid fa-user-tie"></i></div>
                            <div className="feature-name">Expert Coaches</div>
                            <div className="feature-desc">Certified personal trainers</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
