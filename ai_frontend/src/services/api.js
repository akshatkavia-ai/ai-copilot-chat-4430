import axios from 'axios';

const API_BASE_URL =
  // Prefer CRA env variable
  process.env.REACT_APP_API_URL ||
  // Allow host environments to inject at runtime via global
  (typeof window !== 'undefined' && window.__API_BASE_URL__) ||
  // Default fallback for local dev
  'http://localhost:3001';

console.log('[API] Base URL:', API_BASE_URL);

/**
 * Sends a chat message to the backend API.
 * @param {Array<Object>} messages - The history of messages to send.
 * @returns {Promise<Object>} - A promise that resolves with the assistant's message.
 */
// PUBLIC_INTERFACE
export const sendChat = async (messages) => {
  console.log('api.js/sendChat: preparing to send messages:', messages);
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, 
      { messages },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('api.js/sendChat: received response:', response);

    if (response.data && response.data.reply) {
      const assistantMessage = { role: 'assistant', content: response.data.reply };
      return { assistantMessage };
    } else {
      // Handle cases where the response is 200 OK but the data is not what we expect
      throw new Error("Received an invalid response from the assistant.");
    }
  } catch (error) {
    console.error("Error sending message to backend:", error);
    let errorMessage = "An unexpected error occurred while sending your message.";
    let hint = "Check backend logs or network tab.";

    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('api.js/sendChat: error response:', error.response);
      const { status, data } = error.response;
      
      if (status === 400) {
        errorMessage = `Server error (400): ${data.error || data.detail || 'Bad Request'}`;
        hint = data.hint || "This may be due to a missing or invalid API key.";
      } else if (status === 422) {
        // Handle FastAPI validation errors
        try {
          const errorDetails = data.detail.map(err => `${err.loc.join(' -> ')}: ${err.msg}`).join(', ');
          errorMessage = `Invalid request (422): ${errorDetails}`;
          hint = "Check request format.";
        } catch (e) {
          errorMessage = `Invalid request (422): ${JSON.stringify(data.detail) || 'Unprocessable Entity'}`;
          hint = "Check request format.";
        }
      } else if (status === 500) {
        errorMessage = data.error || data.detail || 'Internal server error (500)';
        hint = data.hint || "The backend might be having issues with its configuration or the Gemini API.";
      } else if (status >= 500) {
        errorMessage = 'An internal server error occurred (5xx).';
        hint = "The backend might be having issues.";
      } else {
        errorMessage = `API ${status}: ${data.message || data.error || data.detail || error.response.statusText}`;
        hint = "Unexpected status code.";
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('api.js/sendChat: no response received:', error.request);
      errorMessage = "Failed to get a response from the assistant.";
      hint = "Please check if the backend is running and reachable. This could be a CORS or network issue.";
    }

    // Throw structured error with message and hint
    const structuredError = new Error(errorMessage);
    structuredError.hint = hint;
    throw structuredError;
  }
};


/**
 * Checks the health of the backend API.
 * @returns {Promise<boolean>} - A promise that resolves to true if the backend is healthy, false otherwise.
 */
// PUBLIC_INTERFACE
export const healthCheck = async () => {
  try {
    // Use a timeout to avoid waiting indefinitely
    await axios.get(`${API_BASE_URL}/`, { timeout: 5000 });
    return true;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};
