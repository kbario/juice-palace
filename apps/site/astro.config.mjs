import cloudflare from "@astrojs/cloudflare";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/admin": "/admin/index.html",
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    solidJs(),
    tailwind(),
    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
  output: "hybrid",
  adapter: cloudflare(),
  vite: {
    plugins: [tsconfigPaths()],
  },
});
