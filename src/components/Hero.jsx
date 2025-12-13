import React from 'react';
import './Hero.css';

const Hero = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-content animate-fadeInUp">
                <div className="hero-badge">
                    <span className="badge badge-primary">Arts Festival 2024</span>
                </div>

                <h1 className="hero-title">
                    Welcome to <span className="gradient-text">Kalaafy</span>
                </h1>

                <p className="hero-subtitle">
                    Celebrating creativity, talent, and artistic excellence across colleges.
                    Join us for an unforgettable journey of performances, competitions, and celebrations.
                </p>

                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Programs</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Participants</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">10+</div>
                        <div className="stat-label">Colleges</div>
                    </div>
                </div>

                <div className="hero-actions">
                    <button className="btn btn-primary" onClick={() => scrollToSection('programs')}>
                        Explore Programs
                    </button>
                    <button className="btn btn-outline" onClick={() => scrollToSection('scoreboard')}>
                        View Scores
                    </button>
                </div>
            </div>

            <div className="hero-decoration">
                <div className="floating-icon icon-1">🎭</div>
                <div className="floating-icon icon-2">🎵</div>
                <div className="floating-icon icon-3">💃</div>
                <div className="floating-icon icon-4">🎨</div>
                <div className="floating-icon icon-5">📷</div>
            </div>
        </section>
    );
};

export default Hero;
