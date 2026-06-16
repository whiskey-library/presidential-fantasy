import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker so the game installs and plays offline as an app.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const url = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(url).catch(() => {
      /* offline support is a bonus, never a blocker */
    });
  });
}
