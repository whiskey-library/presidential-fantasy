import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Single-codebase build that serves both the website and the installable PWA app.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
