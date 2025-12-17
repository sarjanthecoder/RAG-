import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import { getStatus } from './api';

/**
 * Main App Component
 * RAG Resume Chatbot with stunning glassmorphism UI
 */
function App() {
    const [systemStatus, setSystemStatus] = useState(null);
    const [hasResume, setHasResume] = useState(false);
    const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'chat'

    // Check system status on mount
    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            const status = await getStatus();
            setSystemStatus(status);
            setHasResume(status.has_resume && status.initialized);
        } catch (err) {
            console.error('Status check failed:', err);
            setSystemStatus({ status: 'offline', initialized: false, has_resume: false });
        }
    };

    const handleUploadSuccess = () => {
        checkStatus();
        setCurrentView('chat');
    };

    const handleStartChat = () => {
        setCurrentView('chat');
    };

    const handleBackToHome = () => {
        setCurrentView('landing');
    };

    return (
        <div className="app-container">
            {/* Floating Orbs for Background Effect */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>

            {/* Header */}
            <Header
                onLogoClick={handleBackToHome}
                currentView={currentView}
            />

            {/* Main Content */}
            <main className="main-content">
                {currentView === 'landing' ? (
                    <LandingPage
                        onUploadSuccess={handleUploadSuccess}
                        onStartChat={handleStartChat}
                        hasResume={hasResume}
                    />
                ) : (
                    <ChatInterface onBack={handleBackToHome} />
                )}
            </main>

            {/* Footer */}
            <Footer />

            {/* Status Badge */}
            <div className="status-badge">
                <div className={`status-dot ${systemStatus?.status === 'online' ? 'status-dot-connected' : 'status-dot-error'}`}></div>
                <span>
                    {systemStatus?.status === 'online'
                        ? hasResume
                            ? `Ready (${systemStatus?.content_length || 0} chars)`
                            : 'Upload a resume to start'
                        : 'Backend Offline'
                    }
                </span>
            </div>
        </div>
    );
}

export default App;
