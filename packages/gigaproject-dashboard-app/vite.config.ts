import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: true,
    port: 5180,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4180,
    strictPort: false,
  },
  plugins: [react()],
});
