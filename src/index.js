import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux"; // Correct import
import store from "./store";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/cardContext";
import { AuthProvider } from "./context/Auth";

// Use ReactDOM.render instead of createRoot for earlier React versions
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </Provider>
);
