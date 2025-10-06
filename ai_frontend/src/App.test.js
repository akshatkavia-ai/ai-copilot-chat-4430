import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AI Copilot header', () => {
  render(<App />);
  const headerElement = screen.getByText(/AI Copilot/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders initial assistant message', () => {
    render(<App />);
    const assistantMessage = screen.getByText(/Hello! How can I assist you today?/i);
    expect(assistantMessage).toBeInTheDocument();
});
