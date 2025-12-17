import React from 'react';

/**
 * TypingIndicator Component
 * Animated dots showing AI is processing
 */
function TypingIndicator() {
    return (
        <div className="message message-ai">
            <div className="message-avatar message-avatar-ai">
                🤖
            </div>
            <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
            </div>
        </div>
    );
}

export default TypingIndicator;
