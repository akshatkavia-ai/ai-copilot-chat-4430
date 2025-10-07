import React, { useState } from 'react';
import './ChatInput.css';

/**
 * ChatInput component for entering and sending messages.
 * PUBLIC_INTERFACE
 * 
 * @param {Object} props
 * @param {Function} props.onSendMessage - Callback function when message is sent
 * @param {boolean} props.disabled - Whether input is disabled (loading state)
 * @returns {JSX.Element} ChatInput component
 */
function ChatInput({ onSendMessage, disabled = false }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !disabled) {
      onSendMessage(trimmedValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="chat-input-container">
        <textarea
          className="chat-input-textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          disabled={disabled}
          rows={1}
          aria-label="Message input"
        />
        <button
          type="submit"
          className="chat-input-button"
          disabled={disabled || !inputValue.trim()}
          aria-label="Send message"
        >
          {disabled ? '⏳' : '📤'}
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
