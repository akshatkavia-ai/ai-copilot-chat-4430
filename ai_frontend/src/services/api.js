import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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
    throw new Error("Failed to get a response from the assistant. Please check if the backend is running.");
  }
};
