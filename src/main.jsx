import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 1. Reset/Normalize (En üste)
import 'normalize.css';

// 2. Projenin ana tasarım sistemi (Design System)
import './styles/global.css'; 

// 3. Ana bileşen
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);