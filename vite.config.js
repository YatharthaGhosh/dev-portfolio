import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config: the React plugin enables JSX and fast refresh while developing.
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js (~900 KB raw / ~245 KB gzip) is lazy-loaded in its own chunk after the page renders,
    // so its size doesn't block the first paint. Raise the warning limit to match.
    chunkSizeWarningLimit: 1000,
  },
});
