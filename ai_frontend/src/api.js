/**
 * API client for communicating with the FastAPI backend.
 * Uses relative paths to benefit from CRA proxy configuration.
 * PUBLIC_INTERFACE
 */

/**
 * Get the API base URL from environment or use relative path for proxy.
 * @returns {string} API base URL
 */
function getApiBaseUrl() {
  const envUrl = process.env.REACT_APP_API_BASE;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  // Return empty string to use relative paths (proxy will handle routing)
  return '';
}

const API_BASE = getApiBaseUrl();

/**
 * Send a chat message to the backend and get a response.
 * PUBLIC_INTERFACE
 * 
 * @param {Array<{role: string, content: string}>} messages - Array of chat messages
 * @param {string} [sessionId] - Optional session identifier
 * @returns {Promise<{message: {role: string, content: string}, model: string, notes?: string}>}
 * @throws {Error} If the request fails
 */
export async function sendChatMessage(messages, sessionId = null) {
  const url = `${API_BASE}/api/chat`;
  
  const requestBody = {
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return await response.json();
}

/**
 * Check backend health status.
 * PUBLIC_INTERFACE
 * 
 * @returns {Promise<{status: string}>}
 */
export async function checkHealth() {
  const url = `${API_BASE}/health`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }
  
  return await response.json();
}
