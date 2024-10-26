import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

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
    solidJs({ devtools: true, exclude: "src/components/r3f/**" }),
    tailwind(),

    AstroPWA({
      mode: "development",
      base: "/",
      scope: "/",
      includeAssets: ["icons/favicon.svg"],
      registerType: "autoUpdate",
      manifest: {
        name: "Juice Palace",
        short_name: "J Palace",
        theme_color: "#f8fafc",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
    react(),
    svelte({ include: "src/components/threlte/**" }),
  ],
  output: "hybrid",
  adapter: cloudflare(),
  vite: {
    plugins: [tsconfigPaths()],
  },
});
