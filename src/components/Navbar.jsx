import React from 'react';

const Navbar = () => {
    return (
        <nav id="navbar">
            <a href="#" className="logo"><img src="/img/logo.png" alt="FIT24 Logo" style={{ height: '70px', width: 'auto' }} /></a>
            <ul className="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#classes">Classes</a></li>
                <li><a href="#schedule">Schedule</a></li>
                <li><a href="#trainers">Trainers</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#bmi">BMI Calculator</a></li>
            </ul>
            <div id="authActions" className="nav-actions">
                <a href="#footer" className="nav-cta ghost" style={{ textDecoration: 'none', padding: '10px 20px' }}>Contact Us</a>
            </div>
            <div id="userProfile">
                <span id="userNameDisplay">John Doe</span>
                <button onClick={() => alert('Logout clicked')}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
