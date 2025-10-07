/**
 * Type definitions for the AI Copilot Chat application.
 * PUBLIC_INTERFACE
 */

/**
 * @typedef {Object} Message
 * @property {string} id - Unique identifier for the message
 * @property {'user' | 'assistant'} role - Role of the message author
 * @property {string} content - Message text content
 * @property {number} timestamp - Message creation timestamp
 */

/**
 * @typedef {Object} ChatMessage
 * @property {'user' | 'assistant'} role - Role of the message author
 * @property {string} content - Message text content
 */

/**
 * @typedef {Object} ChatRequest
 * @property {ChatMessage[]} messages - Array of chat messages
 * @property {string} [model] - Optional model identifier
 */

/**
 * @typedef {Object} ChatResponse
 * @property {ChatMessage} message - Assistant response message
 * @property {string} model - Model identifier
 * @property {string} [notes] - Optional notes
 */

export {};
