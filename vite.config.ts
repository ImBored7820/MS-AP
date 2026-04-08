import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ["musaserver.org", "www.musaserver.org"],
    port: 4173, // Ensures it stays on the port NPM expects
    host: true,  // Equivalent to --host
  },
});
