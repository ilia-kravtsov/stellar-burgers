import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
