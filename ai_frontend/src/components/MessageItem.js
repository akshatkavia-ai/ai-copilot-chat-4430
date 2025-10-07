import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import './MessageItem.css';
import 'highlight.js/styles/github-dark.css';

/**
 * MessageItem component for rendering a single chat message.
 * Supports markdown and syntax highlighting.
 * PUBLIC_INTERFACE
 * 
 * @param {Object} props
 * @param {Object} props.message - Message object
 * @param {string} props.message.id - Message ID
 * @param {'user' | 'assistant'} props.message.role - Message role
 * @param {string} props.message.content - Message content
 * @returns {JSX.Element} MessageItem component
 */
function MessageItem({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`message-item ${isUser ? 'message-user' : 'message-assistant'}`}>
      <div className="message-header">
        <span className="message-role">
          {isUser ? '👤 You' : '🤖 Assistant'}
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
  );
}

export default MessageItem;
