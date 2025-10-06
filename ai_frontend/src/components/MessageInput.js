import React, { useState } from 'react';

// PUBLIC_INTERFACE
function MessageInput({ onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="message-input-container">
      <textarea
        className="message-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here... (Shift+Enter for new line)"
        disabled={isLoading}
      />
      <button
        className="send-button"
        onClick={handleSendMessage}
        disabled={isLoading}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
