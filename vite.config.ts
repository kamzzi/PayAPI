import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 3000,
    fs: {
      strict: false, // Wymagane dla dostępu do plików HTML poza folderem src
    },
    proxy: {}, // Możesz dodać konfigurację proxy, jeśli jest potrzebna
  },
  resolve: {
    alias: {
      "/@": resolve(__dirname, "src"), // Alias dla folderu src
    },
  },
});
