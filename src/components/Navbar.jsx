import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleNavClick = (e, target) => {
        e.preventDefault();
        setIsOpen(false);
        const el = document.querySelector(target);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav id="navbar" className={isOpen ? 'open' : ''}>
            <a href="#" className="logo">
                <img src="/img/logo.png" alt="FIT24 Logo" style={{ height: '70px', width: 'auto' }} />
            </a>

            <button
                className={`nav-menu-toggle ${isOpen ? 'open' : ''}`}
                type="button"
                aria-label="Toggle navigation"
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className="nav-links">
                <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                <li><a href="#facilities" onClick={(e) => handleNavClick(e, '#facilities')}>Our Facilities</a></li>
                <li><a href="#classes" onClick={(e) => handleNavClick(e, '#classes')}>Classes</a></li>
                <li><a href="#schedule" onClick={(e) => handleNavClick(e, '#schedule')}>Schedule</a></li>
                <li><a href="#trainers" onClick={(e) => handleNavClick(e, '#trainers')}>Trainers</a></li>
                <li><a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}>Pricing</a></li>
                <li><a href="#bmi" onClick={(e) => handleNavClick(e, '#bmi')}>BMI Calculator</a></li>
                <li className="nav-links-mobile-cta">
                    <button
                        type="button"
                        className="nav-cta ghost"
                        onClick={(e) => handleNavClick(e, '#footer')}
                    >
                        Contact Us
                    </button>
                </li>
            </ul>

            <div id="authActions" className="nav-actions">
                <a href="#footer" className="nav-cta ghost" style={{ textDecoration: 'none', padding: '10px 20px' }}>
                    Contact Us
                </a>
            </div>

            <div id="userProfile">
                <span id="userNameDisplay">John Doe</span>
                <button onClick={() => alert('Logout clicked')}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
