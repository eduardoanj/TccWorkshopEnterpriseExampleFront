import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/app-router';
import { AuthProvider } from './contexts/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>
);

reportWebVitals();
