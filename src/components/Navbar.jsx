import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem('fit24_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        checkUser();
        // Add listener for login/logout events across the app
        window.addEventListener('storage', checkUser);
        window.addEventListener('userUpdate', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('userUpdate', checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('fit24_user');
        setUser(null);
        window.dispatchEvent(new Event('userUpdate'));
        window.location.href = '/';
    };

    return (
        <nav id="navbar">
            <Link to="/" className="logo">FIT<span>24</span></Link>
            <ul className="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#classes">Classes</a></li>
                <li><a href="#schedule">Schedule</a></li>
                <li><a href="#trainers">Trainers</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#bmi">BMI Calculator</a></li>
                {user && user.role === 'admin' && (
                    <li><Link to="/admin" style={{ color: 'var(--red)' }}>Admin</Link></li>
                )}
            </ul>
            
            <div className="nav-auth">
                {!user ? (
                    <button className="nav-cta" onClick={() => document.getElementById('registerModal').classList.add('active')}>
                        Join Now
                    </button>
                ) : (
                    <div id="userProfile" style={{ display: 'flex' }}>
                        <span id="userNameDisplay">{user.username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
