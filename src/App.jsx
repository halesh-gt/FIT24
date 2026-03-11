import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import Schedule from './components/Schedule';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Modals from './components/Modals';
import Chatbot from './components/Chatbot';

function App() {
    return (
        <>
            <div className="cursor" id="cursor"></div>
            <div className="cursor-ring" id="cursorRing"></div>

            <Navbar />

            <Modals />

            <Hero />

            {/* MARQUEE */}
            <div className="marquee-wrap">
                <div className="marquee-track">
                    <span>HIIT TRAINING</span><span className="dot">✦</span>
                    <span>POWERLIFTING</span><span className="dot">✦</span>
                    <span>YOGA & MOBILITY</span><span className="dot">✦</span>
                    <span>BOXING</span><span className="dot">✦</span>
                    <span>CYCLING</span><span className="dot">✦</span>
                    <span>PILATES</span><span className="dot">✦</span>
                    <span>CROSSFIT</span><span className="dot">✦</span>
                    <span>OPEN 24/7</span><span className="dot">✦</span>
                    <span>HIIT TRAINING</span><span className="dot">✦</span>
                    <span>POWERLIFTING</span><span className="dot">✦</span>
                    <span>YOGA & MOBILITY</span><span className="dot">✦</span>
                    <span>BOXING</span><span className="dot">✦</span>
                    <span>CYCLING</span><span className="dot">✦</span>
                    <span>PILATES</span><span className="dot">✦</span>
                    <span>CROSSFIT</span><span className="dot">✦</span>
                    <span>OPEN 24/7</span><span className="dot">✦</span>
                </div>
            </div>

            <About />
            <Classes />
            <Schedule />
            <Pricing />
            <Trainers />
            <Testimonials />

            <section className="cta-section">
                <div className="cta-bg"></div>
                <div className="section-label reveal">Take The First Step</div>
                <h2 className="section-title reveal" style={{ marginBottom: '24px' }}>READY TO <span style={{ color: 'var(--black)' }}>COMMIT?</span></h2>
                <p className="cta-sub reveal">Join the elite. Start your fitness journey today and experience the difference.</p>
                <div className="cta-actions reveal">
                    <a href="#pricing" className="btn-white">View Memberships</a>
                    <button className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.7)', padding: '18px 0', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)' }} onClick={() => document.getElementById('registerModal').classList.add('active')}>Create Free Account</button>
                </div>
            </section>

            <Footer />

            <div className="open-badge">
                <div className="open-dot"></div>
                <div className="open-text">We are open 24/7</div>
            </div>
        </>
    );
}

export default App;
