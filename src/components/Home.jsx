import React, { useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import Classes from './Classes';
import Schedule from './Schedule';
import Trainers from './Trainers';
import Pricing from './Pricing';
import BMICalculator from './BMICalculator';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Modals from './Modals';
import Navbar from './Navbar';
import Facilities from './Facilities';

const Home = () => {
    useEffect(() => {
        const reveal = () => {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 100;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("visible");
                }
            }
        };

        window.addEventListener("scroll", reveal);
        reveal();

        const navbar = document.getElementById('navbar');
        const handleScroll = () => {
            if (window.scrollY > 50) {
                if (navbar) navbar.classList.add('scrolled');
            } else {
                if (navbar) navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener("scroll", reveal);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar />
            <Modals />
            <Hero />

            <div className="marquee-wrap">
                <div className="marquee-track">
                    <span>HIIT TRAINING</span><span className="dot">✦</span>
                    <span>POWERLIFTING</span><span className="dot">✦</span>
                    <span>YOGA & MOBILITY</span><span className="dot">✦</span>
                    <span>BOXING</span><span className="dot">✦</span>
                    <span>CYCLING</span><span className="dot">✦</span>
                    <span>PILATES</span><span className="dot">✦</span>
                    <span>CROSSFIT</span><span className="dot">✦</span>
                    <span>FIT24 QUALITY</span><span className="dot">✦</span>
                </div>
            </div>

            <About />
            <Facilities />
            <Classes />
            <Schedule />
            <Pricing />
            <BMICalculator />
            <Trainers />
            <Testimonials />

            <section className="cta-section">
                <div className="cta-bg"></div>
                <div className="section-label reveal">Take The First Step</div>
                <h2 className="section-title reveal" style={{ marginBottom: '24px', color: 'var(--black)' }}>READY TO COMMIT?</h2>
                <p className="cta-sub reveal">Join the elite. Start your fitness journey today and experience the difference.</p>
                <div className="cta-actions reveal">
                    <a href="#pricing" className="btn-white">View Memberships</a>
                    <button className="btn-ghost" style={{ borderColor: 'rgba(0,0,0,0.3)', color: 'var(--black)', padding: '18px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)' }} onClick={() => document.getElementById('registerModal').classList.add('active')}>Create Free Account</button>
                </div>
            </section>

            <Footer />

            <div className="open-badge">
                <div className="open-dot"></div>
                <div className="open-text">Experience Excellence</div>
            </div>
        </>
    );
};

export default Home;
