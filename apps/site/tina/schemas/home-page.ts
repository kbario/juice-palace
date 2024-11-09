import type { Collection } from "tinacms";

export const HOME_PAGE = {
  label: "Home Page",
  name: "home",
  path: "content/home",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => {
      return "/";
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Text",
      name: "text",
      isBody: true,
      description: "Make the text **bold** to have a cool effect",
    },
    {
      name: "buttons",
      type: "object",
      list: true,
      description: "Will only show 2. First is primary colour, second is grey",
      ui: {
        itemProps: (btn) => {
          return { label: `${btn.label} - ${btn.link}` };
        },
      },
      fields: [
        {
          name: "label",
          label: "Label",
          type: "string",
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
      ],
    },
    {
      type: "image",
      label: "Hero Image",
      name: "image",
    },
  ],
} satisfies Collection<false>;
