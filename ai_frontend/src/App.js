import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Derive backend URL: prefer REACT_APP_API_URL if set; otherwise same host with port 3001
function getApiBaseUrl() {
  // PUBLIC_INTERFACE
  /** Determine API base URL from environment or window location. */
  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl && envUrl.trim().length > 0) return envUrl;

  try {
    const loc = window.location;
    // If current port is 3000, assume backend on 3001; otherwise, keep hostname and scheme
    const port = '3001';
    return `${loc.protocol}//${loc.hostname}:${port}`;
  } catch {
    // Fallback to relative path
    return '';
  }
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [backendStatus, setBackendStatus] = useState({ loading: true, ok: false, detail: '' });
  const apiBase = getApiBaseUrl();

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check backend health on mount
  useEffect(() => {
    let cancelled = false;
    const checkHealth = async () => {
      try {
        const url = `${apiBase}/health`;
        const res = await fetch(url, { method: 'GET' });
        if (!cancelled) {
          if (res.ok) {
            setBackendStatus({ loading: false, ok: true, detail: 'OK' });
          } else {
            setBackendStatus({ loading: false, ok: false, detail: `HTTP ${res.status}` });
          }
        }
      } catch (e) {
        if (!cancelled) {
          setBackendStatus({ loading: false, ok: false, detail: (e && e.message) || 'Network error' });
        }
      }
    };
    checkHealth();
    return () => { cancelled = true; };
  }, [apiBase]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <div style={{ marginTop: 16 }}>
          <div>Backend base URL: <code>{apiBase || '(relative)'}</code></div>
          <div>
            Backend health:&nbsp;
            {backendStatus.loading ? 'Checking...' : backendStatus.ok ? '✅ Healthy' : `❌ ${backendStatus.detail}`}
          </div>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
