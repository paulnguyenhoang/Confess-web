import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Confess-web/", // ⚠️ Đổi "Love-web" thành tên repository của bạn
  server: {
    port: 3000,
    open: true,
  },
});
