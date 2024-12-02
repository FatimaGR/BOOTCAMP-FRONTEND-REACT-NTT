import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/cart/cart-context';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './context/user/user-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
