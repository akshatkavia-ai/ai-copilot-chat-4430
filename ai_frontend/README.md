# AI Copilot Chat - Frontend

A clean, responsive React chat interface for interacting with an AI assistant powered by the Gemini API.

## Features

- **Clean Chat Interface**: Single-page chat layout with message history
- **Markdown Support**: Full markdown rendering with GitHub Flavored Markdown
- **Syntax Highlighting**: Code blocks with automatic language detection
- **Executive Gray Theme**: Professional themed UI with gray color palette
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful error display with user-friendly messages

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- Backend API running on port 3001

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) and automatically proxy API requests to `http://localhost:3001`.

### Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Configuration options:

- `REACT_APP_API_BASE`: Backend API base URL (optional)
  - Leave unset to use relative paths with the development proxy
  - Set to backend URL for production deployments

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Architecture

The app uses a simplified single-file component structure:

- `src/index.js` - Entry point
- `src/App.js` - Root component
- `src/ChatPage.js` - Main chat interface with all UI logic
- `src/api.js` - API client for backend communication
- `src/index.css` - Global styles and theme
- `src/ChatPage.css` - Component-specific styles

## API Integration

The app communicates with a FastAPI backend via:

- `POST /api/chat`: Send messages and receive responses
- `GET /health`: Check backend health status

API requests use relative paths by default, leveraging the proxy configuration for development.

## Usage

- **Send Messages**: Type in the input field and press Enter (or click send button)
- **New Lines**: Use Shift+Enter to add line breaks in messages
- **Markdown**: Messages support full markdown syntax including code blocks
