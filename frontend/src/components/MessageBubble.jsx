import React from 'react';

/**
 * MessageBubble Component
 * Displays a single chat message with avatar and styled bubble
 */
function MessageBubble({ type, content }) {
    const isUser = type === 'user';

    return (
        <div className={`message ${isUser ? 'message-user' : 'message-ai'}`}>
            <div className={`message-avatar ${isUser ? 'message-avatar-user' : 'message-avatar-ai'}`}>
                {isUser ? '👤' : '🤖'}
            </div>
            <div className="message-content">
                {content}
            </div>
        </div>
    );
}

export default MessageBubble;
