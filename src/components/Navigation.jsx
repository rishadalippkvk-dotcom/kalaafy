import React from 'react';
import './Navigation.css';
import logo from '../assets/logo.png';

const Navigation = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src={logo} alt="Kalaafy Logo" className="logo-image" onClick={() => scrollToSection('home')} />
                </div>

                <ul className="nav-links">
                    <li><a onClick={() => scrollToSection('home')}>Home</a></li>
                    <li><a onClick={() => scrollToSection('programs')}>Programs</a></li>
                    <li><a onClick={() => scrollToSection('scoreboard')}>Scoreboard</a></li>
                    <li><a onClick={() => scrollToSection('notices')}>Notices</a></li>
                    <li><a onClick={() => scrollToSection('gallery')}>Gallery</a></li>
                </ul>

                <button
                    className="nav-cta btn btn-primary"
                    onClick={() => window.location.href = '/admin/login'} // Simple redirect for now, ideally use Link or navigate if within Router context
                >
                    Admin Login
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
