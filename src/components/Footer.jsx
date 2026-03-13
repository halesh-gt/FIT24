import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-grid">
                <div className="footer-brand">
                    <a href="#" className="logo">FIT<span>24</span></a>
                    <p>Elite fitness for everyone. No limits, no excuses.</p>
                </div>
                <div className="footer-col">
                    <h4>Programs</h4>
                    <ul>
                        <li><a href="#">HIIT Blast</a></li>
                        <li><a href="#">Boxing</a></li>
                        <li><a href="#">Power Yoga</a></li>
                        <li><a href="#">Cycle Studio</a></li>
                        <li><a href="#">CrossFit</a></li>
                        <li><a href="#">Powerlifting</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our Coaches</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2026 FIT24. All rights reserved.</span>
                <img src="/img/logo.png" alt="FIT24 Logo" style={{ height: '70px', width: 'auto', marginLeft: '-60px' }} />              <span>Bengaluru · Mumbai · Delhi · Hyderabad</span>
            </div>
        </footer>
    );
};

export default Footer;
