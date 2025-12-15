import React, { useState } from 'react';
import './Navigation.css';
import logo from '../assets/logo.png';

const Navigation = () => {
    const [open, setOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        setOpen(false); // Close menu on click
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Kalaafy Logo" style={{ height: '40px' }} onClick={() => scrollToSection('home')} />
            </div>

            <div className={`nav-links ${open ? "active" : ""}`}>
                <a onClick={() => scrollToSection('home')}>Home</a>
                <a onClick={() => scrollToSection('programs')}>Programs</a>
                <a onClick={() => scrollToSection('scoreboard')}>Scoreboard</a>
                <a onClick={() => scrollToSection('notices')}>Notices</a>
                <a onClick={() => scrollToSection('gallery')}>Gallery</a>
            </div>

            <div className="menu-icon" onClick={() => setOpen(!open)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navigation;