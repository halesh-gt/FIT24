import React from 'react';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <a href="#" className="logo">
                        <img src="/img/logo.png" alt="FIT24 Logo" style={{ height: '70px', width: 'auto' }} />
                    </a>
                    <p>Elite fitness for everyone. No limits, no excuses.</p>
                </div>
                <div className="footer-col">
                    <h4>Programs</h4>
                    <ul>
                        <li><a href="#hiit-blast">HIIT Blast</a></li>
                        <li><a href="#boxing">Boxing</a></li>
                        <li><a href="#power-yoga">Power Yoga</a></li>
                        <li><a href="#cycle-studio">Cycle Studio</a></li>
                        <li><a href="#crossfit">CrossFit</a></li>
                        <li><a href="#powerlifting">Powerlifting</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#trainers">Our Coaches</a></li>
                        <li><a href="#schedule">Schedule</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#bmi">BMI Calculator</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#footer">Contact</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2026 FIT24. All rights reserved.</span>
                <span>Bengaluru · Mumbai · Delhi · Hyderabad</span>
            </div>
        </footer>
    );
};

export default Footer;
