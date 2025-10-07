import React from 'react';
import './Header.css';

/**
 * Header component displaying the application title.
 * PUBLIC_INTERFACE
 * 
 * @returns {JSX.Element} Header component
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">AI Copilot</h1>
        <p className="header-subtitle">Your intelligent assistant</p>
      </div>
    </header>
  );
}

export default Header;
