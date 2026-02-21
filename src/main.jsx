import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Global style imports and third-party library styles
import 'react-toastify/dist/ReactToastify.css';
import 'normalize.css';
import './styles/global.css'; 

import App from './App';

/**
 * Root entry point of the application.
 * Wraps the App with:
 * - Redux Provider for global state management.
 * - BrowserRouter for SPA routing.
 * - React.StrictMode for highlighting potential problems in the application.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);