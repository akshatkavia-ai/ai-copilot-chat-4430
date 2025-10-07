# AI Copilot Chat - Frontend

A clean, responsive React chat interface for interacting with an AI assistant powered by the Gemini API. Features markdown rendering, syntax highlighting, and a modern Executive Gray themed UI.

## Features

- **Clean Chat Interface**: Single-page chat layout with message history
- **Markdown Support**: Full markdown rendering with GitHub Flavored Markdown
- **Syntax Highlighting**: Code blocks with automatic language detection
- **Executive Gray Theme**: Professional dark-themed UI with gray color palette
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Interaction**: Instant message sending and receiving
- **Error Handling**: Graceful error display with user-friendly messages

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- Backend API running on port 3001 (or configure via environment variable)

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
  - Example: `REACT_APP_API_BASE=https://api.example.com`

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # App title and branding
│   ├── MessageList.js  # Message container with auto-scroll
│   ├── MessageItem.js  # Individual message with markdown
│   └── ChatInput.js    # Input field with send button
├── pages/
│   └── ChatPage.js     # Main chat page layout
├── api.js              # API client for backend communication
├── types.js            # Type definitions
├── index.css           # Global styles and theme variables
├── App.js              # Root component
└── index.js            # Entry point
```

### API Integration

The app communicates with a FastAPI backend via REST endpoints:

- `POST /api/chat`: Send messages and receive responses
- `GET /health`: Check backend health status

API requests use relative paths by default, leveraging the CRA proxy configuration for development. In production, set `REACT_APP_API_BASE` to your backend URL.

## Theme Customization

The Executive Gray theme is defined using CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary: #374151;
  --color-secondary: #9CA3AF;
  --color-success: #059669;
  --color-error: #DC2626;
  --color-background: #F9FAFB;
  --color-surface: #FFFFFF;
  --color-text: #111827;
}
```

Modify these variables to customize the color scheme.

## Usage Tips

- **Send Messages**: Type in the input field and press Enter (or click send button)
- **New Lines**: Use Shift+Enter to add line breaks in messages
- **Markdown**: Messages support full markdown syntax including code blocks
- **Code Highlighting**: Wrap code in triple backticks with language identifier

Example message with code:

