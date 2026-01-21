import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Dùng "/" cho dev, "/Confess-web/" cho production
  base: command === "serve" ? "/" : "/Confess-web/",
  server: {
    port: 3000,
    open: true,
  },
}));
