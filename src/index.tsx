import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '@/pages/Home';
import MainLayout from '@/layouts/MainLayout';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <MainLayout>
        <Home />
      </MainLayout>
    </React.StrictMode>,
  );
}
