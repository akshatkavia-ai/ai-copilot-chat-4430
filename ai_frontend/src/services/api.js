import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Sends a chat message to the backend API.
 * @param {Array<Object>} messages - The history of messages to send.
 * @returns {Promise<Object>} - A promise that resolves with the assistant's message.
 */
// PUBLIC_INTERFACE
export const sendChat = async (messages) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { messages });

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

    if (error.response) {
      // The server responded with a status code outside the 2xx range
      const { status, data } = error.response;
      if (status === 400) {
        errorMessage = `Server error (400): ${data.detail || 'Bad Request'}. This may be due to a missing or invalid API key.`;
      } else if (status === 422) {
        // Handle FastAPI validation errors
        try {
            const errorDetails = data.detail.map(err => `${err.loc.join(' -> ')}: ${err.msg}`).join(', ');
            errorMessage = `Invalid request (422): ${errorDetails}`;
        } catch (e) {
            errorMessage = `Invalid request (422): ${JSON.stringify(data.detail) || 'Unprocessable Entity'}`;
        }
      } else if (status >= 500) {
        errorMessage = 'An internal server error occurred (5xx). The backend might be having issues with its configuration or the Gemini API.';
      } else {
        errorMessage = `Received an unexpected status code: ${status}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "Failed to get a response from the assistant. Please check if the backend is running and reachable (CORS or network issue).";
    }

    throw new Error(errorMessage);
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
