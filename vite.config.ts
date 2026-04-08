import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // historyApiFallback is enabled by default in Vite dev server
  },
});
