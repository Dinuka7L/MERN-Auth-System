import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // ✅ enable source maps for prod builds
  },
  server: {
    sourcemap: true, // ✅ for dev server (optional, usually auto-enabled)
  },
});
