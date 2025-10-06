import React, { useState } from 'react';

// PUBLIC_INTERFACE
function MessageInput({ onSendMessage, isLoading, backendStatus }) {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Manually check if send is disabled before sending via Enter key
      if (!isSendDisabled) {
        handleSend();
      }
    }
  };

  const isSendDisabled = isLoading || backendStatus !== 'online' || !message.trim();
  
  const placeholderText =
    backendStatus === 'online'
      ? 'Type your message here... (Shift+Enter for new line)'
      : 'You can type, but the backend is offline.';

  return (
    <div className="message-input-container">
      <textarea
        className="message-input"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholderText}
        disabled={isLoading}
      />
      <button
        type="button"
        className="send-button"
        onClick={handleSend}
        disabled={isSendDisabled}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
