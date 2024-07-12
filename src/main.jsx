import React from 'react';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="451096883853-t6eao0p4nrv03is0n3dfota5o9f211i9.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
