import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";
import { ActiveContextProvider } from "./contexts/ActiveContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <ActiveContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ActiveContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
