import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/responsive.css";
import "./styles/animations.css";
import "./styles/layout.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2500}
        />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);