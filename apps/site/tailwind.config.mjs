import asdf from "@juice-palace/tailwind-config";
import { join } from "path";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    join(__dirname, "src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"),
  ],
  ...asdf,
  plugins: [require("@kobalte/tailwindcss")],
};
