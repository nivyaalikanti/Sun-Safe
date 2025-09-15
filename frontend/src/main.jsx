import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
createRoot(document.getElementById('root')).render(<App />);
