import React from 'react';

const Navbar = () => {
    return (
        <nav id="navbar">
            <a href="#" className="logo">FIT<span>24</span></a>
            <ul className="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#classes">Classes</a></li>
                <li><a href="#schedule">Schedule</a></li>
                <li><a href="#trainers">Trainers</a></li>
                <li><a href="#pricing">Pricing</a></li>
            </ul>
            <div id="authActions">
                <button className="nav-cta" onClick={() => {
                    const el = document.getElementById('loginModal');
                    if (el) el.classList.add('active');
                }}>Sign In</button>
            </div>
            <div id="userProfile">
                <span id="userNameDisplay">John Doe</span>
                <button onClick={() => alert('Logout clicked')}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
