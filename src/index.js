import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import ThemeProvider from './contexts/ThemeContext';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <ThemeProvider>
                  <App />
              </ThemeProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);



