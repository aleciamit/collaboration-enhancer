import React from 'react';
import './styles/global.css'; // Import your global styles
import './styles.css'; // Import your component styles
import { MainUI } from './ui'; // Import your MainUI component

const App = () => (
  <React.StrictMode>
    <MainUI />
  </React.StrictMode>
);

export default App;