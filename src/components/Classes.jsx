import React from 'react';

const Classes = () => {
    return (
        <section id="classes" className="classes-section" style={{ padding: 0 }}>
            <div style={{ padding: '80px 60px 48px' }}>
                <div className="section-label reveal">Our Programs</div>
                <h2 className="section-title reveal">FIND YOUR<br /><span style={{ color: 'var(--red)' }}>DISCIPLINE</span></h2>
            </div>
            <div className="classes-grid reveal">
                <div id="hiit-blast" className="class-card">
                    <div className="class-card-bg"></div>
                    <div className="class-card-pattern"></div>
                    <div className="class-card-content">
                        <div className="class-card-icon"><i className="fa-solid fa-bolt"></i></div>
                        <div className="class-tag">High Intensity</div>
                        <div className="class-name">HIIT Blast</div>
                        <div className="class-desc">Maximum burn in minimum time. 45-min full-body circuits.</div>
                    </div>
                    <div className="class-hover">BOOK NOW →</div>
                </div>
                <div id="boxing" className="class-card">
                    <div className="class-card-bg"></div>
                    <div className="class-card-pattern"></div>
                    <div className="class-card-content">
                        <div className="class-card-icon"><i className="fa-solid fa-hand-fist"></i></div>
                        <div className="class-tag">Combat</div>
                        <div className="class-name">Boxing</div>
                        <div className="class-desc">Master technique and destroy stress. All skill levels welcome.</div>
                    </div>
                    <div className="class-hover">BOOK NOW →</div>
                </div>
                <div id="power-yoga" className="class-card">
                    <div className="class-card-bg"></div>
                    <div className="class-card-pattern"></div>
                    <div className="class-card-content">
                        <div className="class-card-icon"><i className="fa-solid fa-person-praying"></i></div>
                        <div className="class-tag">Mind & Body</div>
                        <div className="class-name">Power Yoga</div>
                        <div className="class-desc">Strength through stillness. Flexibility meets focus.</div>
                    </div>
                    <div className="class-hover">BOOK NOW →</div>
                </div>
                <div id="cycle-studio" className="class-card">
                    <div className="class-card-bg"></div>
                    <div className="class-card-pattern"></div>
                    <div className="class-card-content">
                        <div className="class-card-icon"><i className="fa-solid fa-bicycle"></i></div>
                        <div className="class-tag">Cardio</div>
                        <div className="class-name">Cycle Studio</div>
                        <div className="class-desc">High-energy indoor cycling to burn calories and build endurance.</div>
                    </div>
                    <div className="class-hover">BOOK NOW →</div>
                </div>
                <div id="powerlifting" className="class-card">
                    <div className="class-card-bg"></div>
                    <div className="class-card-pattern"></div>
                    <div className="class-card-content">
                        <div className="class-card-icon"><i className="fa-solid fa-dumbbell"></i></div>
                        <div className="class-tag">Strength</div>
                        <div className="class-name">Powerlifting</div>
                        <div className="class-desc">Master the big three lifts. Get stronger, build muscle.</div>
                    </div>
                    <div className="class-hover">BOOK NOW →</div>
                </div>
                <div id="crossfit" className="class-card">
                    <div className="class-card-bg"></div>
                    <div className="class-card-pattern"></div>
                    <div className="class-card-content">
                        <div className="class-card-icon"><i className="fa-solid fa-stopwatch"></i></div>
                        <div className="class-tag">Foundation</div>
                        <div className="class-name">CrossFit</div>
                        <div className="class-desc">Intense functional movements to improve overall fitness and power.</div>
                    </div>
                    <div className="class-hover">BOOK NOW →</div>
                </div>
            </div>
        </section>
    );
};

export default Classes;
