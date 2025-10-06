import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import { sendChat } from './services/api';

// PUBLIC_INTERFACE
function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message list whenever messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // PUBLIC_INTERFACE
  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);

    try {
      const { assistantMessage } = await sendChat(newMessages);
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Copilot</h1>
      </header>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      <div className="message-list" ref={messageListRef}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
           <ChatMessage message={{role: 'assistant', content: 'Thinking...'}} />
        )}
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
