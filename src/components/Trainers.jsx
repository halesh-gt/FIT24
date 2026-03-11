import React from 'react';

const Trainers = () => {
    return (
        <section id="trainers" className="trainers-section">
            <div style={{ padding: '0 60px' }}>
                <div className="section-label reveal">Our Experts</div>
                <h2 className="section-title reveal">LEADERS IN<br /><span style={{ color: 'var(--red)' }}>FITNESS</span></h2>

                <div className="trainers-grid reveal">
                    <div className="trainer-card">
                        <div className="trainer-img" style={{ backgroundImage: "url('../public/img/trainer_1.png')" }}>
                            <div className="trainer-exp-badge">10+ YEARS EXP</div>
                        </div>
                        <div className="trainer-info">
                            <h3 className="trainer-name">Rahul Sharma</h3>
                            <span className="trainer-spec">Bodybuilding & Weight Loss</span>
                            <ul className="trainer-certs">
                                <li>ACE Certified Personal Trainer</li>
                                <li>Precision Nutrition Level 1</li>
                                <li>Strength & Conditioning Specialist</li>
                            </ul>
                        </div>
                    </div>

                    <div className="trainer-card">
                        <div className="trainer-img" style={{ backgroundImage: "url('../public/img/trainer_2.png')" }}>
                            <div className="trainer-exp-badge">7 YEARS EXP</div>
                        </div>
                        <div className="trainer-info">
                            <h3 className="trainer-name">Priya Desai</h3>
                            <span className="trainer-spec">Yoga & Functional Mobility</span>
                            <ul className="trainer-certs">
                                <li>RYT 500 Certified Yoga Instructor</li>
                                <li>FMS Certified Level 2</li>
                                <li>Holistic Wellness Coach</li>
                            </ul>
                        </div>
                    </div>

                    <div className="trainer-card">
                        <div className="trainer-img" style={{ backgroundImage: "url('../public/img/trainer_3.png')" }}>
                            <div className="trainer-exp-badge">12 YEARS EXP</div>
                        </div>
                        <div className="trainer-info">
                            <h3 className="trainer-name">Vikram Singh</h3>
                            <span className="trainer-spec">CrossFit & Powerlifting</span>
                            <ul className="trainer-certs">
                                <li>CrossFit Level 3 Coach</li>
                                <li>USAW Sports Performance Coach</li>
                                <li>Advanced First Aid / CPR</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trainers;
