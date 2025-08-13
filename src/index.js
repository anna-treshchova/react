import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router'

import App from './App';

import './index.css';

import ThemeProvider from './contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider>
              <App />
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);



