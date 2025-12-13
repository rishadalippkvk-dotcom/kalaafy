import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-icon">🎨</span>
                            <span className="logo-text">Kalaafy</span>
                        </div>
                        <p className="footer-tagline">
                            Celebrating artistic excellence and creativity across colleges.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#programs">Programs</a></li>
                            <li><a href="#scoreboard">Scoreboard</a></li>
                            <li><a href="#notices">Notices</a></li>
                            <li><a href="#gallery">Gallery</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <div className="contact-info">
                            <p>📧 info@kalaafy.edu</p>
                            <p>📞 +91 1234567890</p>
                            <p>📍 College Campus, City</p>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="#" className="social-icon">📘</a>
                            <a href="#" className="social-icon">📷</a>
                            <a href="#" className="social-icon">🐦</a>
                            <a href="#" className="social-icon">▶️</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Kalaafy. All rights reserved.</p>
                    <p>Made with ❤️ for Arts Festival</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
