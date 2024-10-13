import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  site: "https://juice-palace.com",
  redirects: {
    "/admin": "/admin/index.html",
    "/a": "/",
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap(),
    solidJs({ devtools: true }),
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
