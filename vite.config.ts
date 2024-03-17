// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "./src/pages/about.html"),
        contact: resolve(__dirname, "./src/pages/contact.html"),
        pricing: resolve(__dirname, "./src/pages/pricing.html"),
      },
    },
  },
});
