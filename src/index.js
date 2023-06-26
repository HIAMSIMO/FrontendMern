import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BookCtxtProvider} from './context/bookContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BookCtxtProvider >
      <App />
    </BookCtxtProvider> 
  </React.StrictMode>
);


