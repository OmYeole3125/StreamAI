import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1f2937",
          color: "#fff",
          fontWeight: "bold",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          padding: "10px",
        },
        success: {
          style: {
            background: "#10b981",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        },
      }}
    />
    />
  </StrictMode>
);
