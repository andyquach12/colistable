import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { staticLegalPages } from "./vite-plugin-static-legal-pages";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Cache-Control": "no-cache",
    },
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    rollupOptions: {
      output: {
        // Hashed filenames are default in Vite, ensuring immutable caching
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  plugins: [
    {
      name: 'serve-static-legal-pages',
      configureServer(server: any) {
        server.middlewares.use((req: any, _res: any, next: any) => {
          if (req.url === '/privacy' || req.url === '/privacy/') {
            req.url = '/privacy.html';
          } else if (req.url === '/tos' || req.url === '/tos/') {
            req.url = '/tos.html';
          }
          next();
        });
      }
    },
    react(),
    mode === "development" && componentTagger(),
    staticLegalPages(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
