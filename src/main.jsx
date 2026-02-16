import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // 1. Provider'ı içe aktar
import { store } from './redux/store';  // 2. Hazırladığın store'u içe aktar

// 1. Reset/Normalize
import 'normalize.css';

// 2. Projenin ana tasarım sistemi
import './styles/global.css'; 

// 3. Ana bileşen
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Provider ile BrowserRouter'ı sarmala */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);