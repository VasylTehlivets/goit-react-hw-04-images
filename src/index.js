import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

const meta = document.createElement('meta');
meta.httpEquiv = 'Permissions-Policy';
meta.content = 'interest-cohort=()';
document.head.appendChild(meta);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
