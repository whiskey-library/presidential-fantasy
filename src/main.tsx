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
// Dev builds skip it — a cache-first SW poisons Vite's live module graph.
if ("serviceWorker" in navigator && !import.meta.env.DEV) {
  window.addEventListener("load", () => {
    const url = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(url).catch(() => {
      /* offline support is a bonus, never a blocker */
    });
  });
}
