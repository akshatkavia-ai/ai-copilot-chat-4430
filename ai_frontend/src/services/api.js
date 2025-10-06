import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Sends a chat message to the backend API.
 * @param {Array<Object>} messages - The history of messages to send.
 * @returns {Promise<Object>} - A promise that resolves with the assistant's message.
 */
// PUBLIC_INTERFACE
export const sendChat = async (messages) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { messages });
    // The backend sends back { reply: '...' }, but the frontend expects a message object.
    const assistantMessage = { role: 'assistant', content: response.data.reply };
    return { assistantMessage };
  } catch (error) {
    console.error("Error sending message to backend:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 400) {
        throw new Error(`Server error: ${error.response.data.detail || 'Bad Request'}. This might be due to a missing or invalid API key.`);
      }
      if (error.response.status >= 500) {
         throw new Error('An internal server error occurred. The backend might be having issues with its configuration or the Gemini API.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("Failed to get a response from the assistant. Please check if the backend is running and reachable.");
    }
    // Something happened in setting up the request that triggered an Error
    throw new Error("An unexpected error occurred while sending your message.");
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
        await axios.get(`${API_URL}/`, { timeout: 5000 });
        return true;
    } catch (error) {
        console.error("Backend health check failed:", error);
        return false;
    }
};
