import React from 'react';

// PUBLIC_INTERFACE
function MessageInput({ onSendMessage, isLoading, backendStatus, inputMessage, setInputMessage }) {

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSend = () => {
    // Guard against sending empty or during loading, parent handles main logic
    if (inputMessage.trim() && !isLoading && backendStatus === 'online') {
      onSendMessage();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on Enter
      handleSend();
    }
  };

  const isSendDisabled = isLoading || backendStatus !== 'online' || !inputMessage.trim();

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <textarea
        className="message-input"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here... (Shift+Enter for new line)"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="send-button"
        onClick={handleSend}
        disabled={isSendDisabled}
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
