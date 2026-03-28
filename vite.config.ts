import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function getBasePath() {
  const explicitBasePath = process.env.PAGES_BASE_PATH;
  if (explicitBasePath) {
    return explicitBasePath.endsWith("/")
      ? explicitBasePath
      : `${explicitBasePath}/`;
  }

  return "/";
}

function getBuildOutDir() {
  return path.resolve(
    import.meta.dirname,
    process.env.STATIC_BUILD_OUT_DIR ?? "dist/public",
  );
}

export default defineConfig({
  base: getBasePath(),
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: getBuildOutDir(),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
