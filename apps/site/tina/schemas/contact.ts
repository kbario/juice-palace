import type { Collection } from "tinacms";

export const CONTACT = {
  label: "Contact",
  name: "openingHours",
  path: "content/openingHours",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => {
      return "/contact";
    },
  },
  fields: [
    {
      type: "string",
      name: "contactEmail",
      label: "Contact Email",
      required: true,
      description:
        "the email address that you want the customer enquiry to be sent",
    },
    {
      type: "string",
      name: "contactDesc",
      label: "Contact Hook",
      required: true,
    },
    {
      type: "string",
      name: "contactBtnText",
      label: "Contact Button Text",
      required: true,
    },
    {
      type: "object",
      label: "Locations",
      name: "locations",
      list: true,
      ui: {
        itemProps: (loc) => {
          return { label: loc.displayName };
        },
      },
      fields: [
        {
          type: "string",
          name: "displayName",
          label: "Name",
          required: true,
        },
        {
          type: "string",
          name: "desc",
          label: "Description",
        },
        {
          type: "string",
          label: "Map String",
          description: "put the string from google maps here",
          name: "mapLocation",
          required: true,
        },
        {
          label: "Days and Times",
          name: "times",
          type: "string",
          required: true,
        },
        {
          label: "Temporarily Hide",
          type: "boolean",
          name: "hide",
          description:
            "Useful if you want to keep the config but hide it for a period of time",
        },
      ],
    },
  ],
} satisfies Collection<false>;
