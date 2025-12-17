import React from 'react';

/**
 * Header Component
 * Stunning navigation header with gradient effects
 */
function Header({ onLogoClick, currentView }) {
    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo */}
                <div className="header-logo" onClick={onLogoClick}>
                    <span className="logo-icon">🤖</span>
                    <span className="logo-text">ResumeAI</span>
                </div>

                {/* Navigation */}
                <nav className="header-nav">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#how-it-works" className="nav-link">How it Works</a>
                    <a href="https://github.com/sarjanthecoder" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
                </nav>

                {/* CTA Button */}
                <button className="header-cta" onClick={onLogoClick}>
                    {currentView === 'chat' ? '← Back' : 'Get Started'}
                </button>
            </div>
        </header>
    );
}

export default Header;
