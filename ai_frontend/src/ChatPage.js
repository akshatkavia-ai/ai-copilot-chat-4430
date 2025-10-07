import React, { useState } from 'react';
import { sendChatMessage } from './api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
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
  const [inputValue, setInputValue] = useState('');
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
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    const content = inputValue.trim();
    if (!content || isLoading) return;

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
    setInputValue('');
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

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat-page">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">AI Copilot</h1>
          <p className="header-subtitle">Your intelligent assistant</p>
        </div>
      </header>
      
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
        <div className="message-list">
          {messages.length === 0 ? (
            <div className="message-list-empty">
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>Start a conversation</h3>
                <p>Send a message to begin chatting with your AI assistant</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`message-item ${message.role === 'user' ? 'message-user' : 'message-assistant'}`}
              >
                <div className="message-header">
                  <span className="message-role">
                    {message.role === 'user' ? '👤 You' : '🤖 Assistant'}
                  </span>
                </div>
                <div className="message-content markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <div className="chat-input-container">
          <textarea
            className="chat-input-textarea"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            disabled={isLoading}
            rows={1}
            aria-label="Message input"
          />
          <button
            type="submit"
            className="chat-input-button"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatPage;
