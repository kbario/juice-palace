import { defineConfig } from "tinacms";
import { HOME_PAGE } from "./schemas/home-page";
import { MENU } from "./schemas/menu";
import { CONTACT } from "./schemas/contact";
import { DOGS } from "./schemas/dogs";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.GITHUB_HEAD_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || import.meta.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN || import.meta.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [HOME_PAGE, MENU, CONTACT, DOGS],
  },
});
