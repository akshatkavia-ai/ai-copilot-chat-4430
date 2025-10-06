import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import { sendChat, healthCheck } from './services/api';

// PUBLIC_INTERFACE
function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorHint, setErrorHint] = useState(null);
  const messageListRef = useRef(null);
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, online, offline

  useEffect(() => {
    // Perform an initial health check when the component mounts
    const checkBackendStatus = async () => {
      const isOnline = await healthCheck();
      setBackendStatus(isOnline ? 'online' : 'offline');
    };

    checkBackendStatus();

    // Optional: Periodically check the health
    const intervalId = setInterval(checkBackendStatus, 60000); // Check every 60 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message list whenever messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // PUBLIC_INTERFACE
  const handleSendMessage = async (message) => {
    console.log('[App] Send attempt started with message:', message);
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);
    setErrorHint(null);

    try {
      console.log('[App] Sending messages to API:', newMessages);
      const { assistantMessage } = await sendChat(newMessages);
      console.log('[App] Send succeeded, received assistant message:', assistantMessage);
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (err) {
      console.error("[App] Send failed with error:", err);
      setError(err.message || 'An unexpected error occurred.');
      setErrorHint(err.hint || 'Please check backend status and CORS configuration.');
      // Revert optimistic update on error
      setMessages(messages);
    } finally {
      console.log('[App] Send attempt finished');
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="status-indicator">
          <div className={`status-dot ${backendStatus}`} />
           Backend: {backendStatus.charAt(0).toUpperCase() + backendStatus.slice(1)}
        </div>
        <h1>AI Copilot</h1>
      </header>

      {error && (
        <div className="error-banner">
          <p><strong>Error:</strong> {error}</p>
          {errorHint && <p><strong>Hint:</strong> {errorHint}</p>}
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
      
      <MessageInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
