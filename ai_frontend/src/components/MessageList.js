import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import './MessageList.css';

/**
 * MessageList component for displaying a list of chat messages.
 * Automatically scrolls to bottom when new messages arrive.
 * PUBLIC_INTERFACE
 * 
 * @param {Object} props
 * @param {Array<Object>} props.messages - Array of message objects
 * @returns {JSX.Element} MessageList component
 */
function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="message-list-empty">
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Start a conversation</h3>
          <p>Send a message to begin chatting with your AI assistant</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
