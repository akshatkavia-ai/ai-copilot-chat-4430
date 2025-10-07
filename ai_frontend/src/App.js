import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * Resolve API base URL.
 * PUBLIC_INTERFACE
 * - Uses REACT_APP_API_URL if provided.
 * - Otherwise prefers relative path '' so that calls like fetch('/health') hit the same origin (works with proxy).
 * - As a dev fallback on localhost, attempts http(s)://hostname:3001.
 */
function getApiBaseUrl() {
  /** Determine API base URL from environment or window location. */
  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl && envUrl.trim().length > 0) return envUrl.trim();

  try {
    const { protocol, hostname } = window.location;
    // Prefer relative path to leverage proxy/same-origin routing
    // This returns empty string so consumers use fetch('/path')
    // If running on localhost during dev and a separate backend runs on 3001, allow that as a secondary fallback.
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    if (isLocalhost) {
      return `${protocol}//${hostname}:3001`;
    }
    return '';
  } catch {
    // SSR or no window: use relative
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

    // helper to timeout fetches
    const fetchWithTimeout = (input, init, timeoutMs = 5000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      const mergedInit = { ...init, signal: controller.signal };
      return fetch(input, mergedInit).finally(() => clearTimeout(id));
    };

    const checkHealth = async () => {
      try {
        // If apiBase is '', this becomes '/health' which hits same-origin/proxy.
        const url = `${apiBase}/health`;
        const res = await fetchWithTimeout(url, { method: 'GET', mode: 'cors', credentials: 'omit' }, 5000);
        if (!cancelled) {
          if (res.ok) {
            setBackendStatus({ loading: false, ok: true, detail: 'OK' });
          } else {
            setBackendStatus({ loading: false, ok: false, detail: `HTTP ${res.status}` });
          }
        }
      } catch (e) {
        if (!cancelled) {
          const detail = e?.name === 'AbortError' ? 'Request timeout' : (e?.message || 'Network error');
          setBackendStatus({ loading: false, ok: false, detail });
        }
      }
    };

    // fire-and-forget; UI remains responsive even if health fails
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
