# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode. The dev server binds to 0.0.0.0:3000 (set via HOST and PORT in package.json) so it is reachable in containerized previews.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

If your backend runs on a different host than localhost inside the preview/container, set REACT_APP_API_URL accordingly (see .env.example).

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Configuration

### Backend API URL

The frontend needs to know where the backend API is running. This is configured via the `REACT_APP_API_URL` environment variable.

**Important:** Create React App only reads environment variables at build/start time. After changing `.env`, you **must restart the dev server** for the changes to take effect.

#### Setting up the backend URL:

1. Copy `.env.example` to `.env` if it doesn't exist:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set `REACT_APP_API_URL` to your backend's full URL, including protocol and port:
   ```
   REACT_APP_API_URL=https://vscode-internal-14847-beta.beta01.cloud.kavia.ai:3001
   ```
   
   For local development:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

3. **Restart the dev server** (stop and run `npm start` again) for the change to take effect.

#### How it works:

- The app reads `REACT_APP_API_URL` from the environment at startup
- If not set, it defaults to `http://localhost:3001`
- The value is used in `src/services/api.js` to make API calls to the backend

**Note:** In Kavia preview environments, make sure the URL matches the backend preview origin exactly, including the protocol (`https://`) and port (`:3001`). Mismatches will cause CORS errors or 502 Bad Gateway responses.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --background: #F9FAFB;
  --surface: #FFFFFF;
  --primary: #374151;
  --secondary: #9CA3AF;
  --success: #059669;
  --error: #DC2626;
  --text-primary: #111827;
  --text-on-primary-bg: #FFFFFF;
  --border-color: #E5E7EB;
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
