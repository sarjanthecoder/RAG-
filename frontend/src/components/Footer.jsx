import React from 'react';

/**
 * Footer Component
 * Sleek footer with links and credits
 */
function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Left Section - Brand */}
                <div className="footer-brand">
                    <span className="footer-logo">🤖 ResumeAI</span>
                    <p className="footer-tagline">AI-powered resume assistant using RAG technology</p>
                </div>

                {/* Middle Section - Links */}
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Product</h4>
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How it Works</a>
                        <a href="#demo">Demo</a>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <a href="https://github.com/sarjanthecoder" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/sarjan-p-7a97862a0" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://sarjan.site" target="_blank" rel="noopener noreferrer">Portfolio</a>
                    </div>
                </div>

                {/* Right Section - Tech Stack */}
                <div className="footer-tech">
                    <h4>Powered By</h4>
                    <div className="tech-badges">
                        <span className="tech-badge">⚛️ React</span>
                        <span className="tech-badge">🐍 Python</span>
                        <span className="tech-badge">🧠 Gemini AI</span>
                        <span className="tech-badge">⚡ FastAPI</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p>© 2025 ResumeAI. Built with ❤️ by Sarjan P</p>
                <p className="footer-version">v2.0 - RAG Powered</p>
            </div>
        </footer>
    );
}

export default Footer;
