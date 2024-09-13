import asdf from "@juice-palace/tailwind-config";
import { join } from "path";
/** @type {import('tailwindcss').Config} */
export default {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx,mdx}")],
  ...asdf,
};
