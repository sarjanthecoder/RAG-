import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../api';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

/**
 * ChatInterface Component
 * Interactive chat with the AI-powered resume assistant
 */
function ChatInterface({ onBack }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const quickQuestions = [
        "What are your skills?",
        "Tell me about your experience",
        "What projects have you worked on?",
        "What's your educational background?",
        "What technologies do you know?",
        "What are your certifications?",
    ];

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessageToBot = async (userMessage) => {
        if (!userMessage.trim() || isLoading) return;

        setInput('');
        setError(null);

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await sendMessage(userMessage);
            setMessages(prev => [...prev, { type: 'ai', content: response.answer }]);
        } catch (err) {
            setError(err.message || 'Failed to get response. Make sure the backend is running.');
            console.error('Chat error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        await sendMessageToBot(input);
    };

    const handleQuickQuestion = (question) => {
        sendMessageToBot(question);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="chat-container">
            {/* Back Button */}
            <button className="back-button" onClick={onBack}>
                ← Back to Home
            </button>

            {/* Chat Box */}
            <div className="chat-box">
                {/* Messages Area */}
                <div className="messages-container">
                    {messages.length === 0 ? (
                        <div className="welcome-container">
                            <div className="welcome-icon">🤖</div>
                            <h2 className="welcome-title">Ask me anything about the resume!</h2>
                            <p className="welcome-description">
                                I'm your AI assistant, ready to answer questions about
                                skills, experience, projects, and more.
                            </p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <MessageBubble key={index} type={msg.type} content={msg.content} />
                        ))
                    )}

                    {isLoading && <TypingIndicator />}

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div className="quick-questions">
                    <div className="quick-questions-title">💡 Quick Questions</div>
                    <div className="quick-questions-grid">
                        {quickQuestions.map((question, index) => (
                            <button
                                key={index}
                                className="quick-question-btn"
                                onClick={() => handleQuickQuestion(question)}
                                disabled={isLoading}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Area */}
                <div className="input-container">
                    <form onSubmit={handleSubmit} className="input-wrapper">
                        <input
                            type="text"
                            className="message-input"
                            placeholder="Ask me anything about my resume..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="send-button"
                            disabled={isLoading || !input.trim()}
                        >
                            ➤
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatInterface;
