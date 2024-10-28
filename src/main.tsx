import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import your global styles
import App from './App'; // Import the App component, no .tsx extension

// Render the App component inside StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);