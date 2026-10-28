import React from 'react';
import './index.css';
import App from './client/App';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
if (!domNode) {
  throw new Error('Root element #root not found');
}
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
