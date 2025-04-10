import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

import App from './App';
import { AuthProvider } from './contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <AuthProvider>
      <AuthProvider>
    <AuthProvider>
        <App />
    </AuthProvider>
    </AuthProvider>
    </AuthProvider>
);