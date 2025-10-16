import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CommentsProvider } from "./context/CommentsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CommentsProvider>
          <App />
        </CommentsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
