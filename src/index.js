import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './store/store';

render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
