import React, { useState } from 'react';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import { sendChatMessage } from '../api';
import './ChatPage.css';

/**
 * ChatPage component - Main chat interface layout.
 * Manages message state, API calls, and error handling.
 * PUBLIC_INTERFACE
 * 
 * @returns {JSX.Element} ChatPage component
 */
function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generate a unique ID for messages.
   * @returns {string} Unique message ID
   */
  const generateId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Handle sending a new message.
   * @param {string} content - Message content to send
   */
  const handleSendMessage = async (content) => {
    // Clear any previous errors
    setError(null);

    // Create user message
    const userMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    // Add user message to state
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare messages for API (only role and content)
      const apiMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call backend API
      const response = await sendChatMessage(apiMessages);

      // Create assistant message from response
      const assistantMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.message.content,
        timestamp: Date.now(),
      };

      // Add assistant message to state
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');
      
      // Show error message in chat
      const errorMessage = {
        id: generateId(),
        role: 'assistant',
        content: `⚠️ **Error**: ${err.message || 'Failed to send message. Please try again.'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <Header />
      
      {error && (
        <div className="error-banner" role="alert">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{error}</span>
          <button 
            className="error-dismiss"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="chat-content">
        <MessageList messages={messages} />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
    </div>
  );
}

export default ChatPage;
