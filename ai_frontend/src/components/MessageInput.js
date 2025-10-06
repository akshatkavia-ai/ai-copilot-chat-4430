import React, { useState } from 'react';

// PUBLIC_INTERFACE
function MessageInput({ onSendMessage, isLoading, backendStatus }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    // Parent component's onSendMessage has the primary guard.
    // This is an additional safeguard and UI logic.
    if (inputValue.trim() && !isLoading && backendStatus === 'online') {
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

  // The button should be disabled if we are loading, if the backend is not online, or if the input is empty.
  const isSendDisabled = isLoading || backendStatus !== 'online' || !inputValue.trim();

  return (
    <div className="message-input-container">
      <textarea
        className="message-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here... (Shift+Enter for new line)"
        // The input itself should only be disabled when a response is actively loading.
        disabled={isLoading}
      />
      <button
        className="send-button"
        onClick={handleSendMessage}
        disabled={isSendDisabled}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
