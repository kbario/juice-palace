// @ts-check
import cloudflare from '@astrojs/cloudflare';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/admin': '/admin/index.html',
  },
  integrations: [solidJs(), tailwind()],
  output: 'server',
  adapter: cloudflare(),
});
