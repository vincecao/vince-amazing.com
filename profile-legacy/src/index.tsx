import React from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import App from './App';
import { AppearanceProvider } from '@vincecao/use-tools';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);
