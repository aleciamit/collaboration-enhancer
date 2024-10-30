import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css'; // Import your global styles
import './components/CommentInput/styles.css'; // Import your component styles
import { MainUI } from './ui'; // Import your MainUI component

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainUI />
  </React.StrictMode>
);