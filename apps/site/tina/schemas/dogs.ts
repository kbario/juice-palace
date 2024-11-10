import type { Collection } from "tinacms";

export const DOGS = {
  label: "Dogs of Juice Palace",
  name: "dogs",
  path: "content/dogs",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => {
      return "/dogs-of-juice-palace";
    },
  },
  fields: [
    {
      type: "object",
      name: "dogs",
      label: "Dogs",
      list: true,
      ui: {
        itemProps: (item) => {
          function pluralise(num: number, word: string) {
            return `${num} ${word}${num === 1 ? "" : "s"}`;
          }
          function getAge(dateString: string | undefined | null) {
            if (!dateString) return;
            const today = new Date();
            const birthDate = new Date(dateString);
            const age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (age === 0) {
              return `${pluralise(m, "month")} old`;
            }
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              return `${pluralise(age - 1, "year")} old`;
            }
            return `${pluralise(age, "year")} old`;
          }
          const age = getAge(item.birthday);
          const label = [item.name, age].filter(Boolean).join(" - ");
          return { label };
        },
      },
      fields: [
        { type: "string", name: "name", label: "Dog name", required: true },
        { type: "string", name: "desc", label: "Description" },
        {
          type: "string",
          name: "tags",
          label: "Tags",
          description: "any traits or unique qualities",
          list: true,
        },
        {
          type: "boolean",
          name: "hide",
          label: "Hide",
          description: "just incase you want to temporarily hide a dog",
        },
        { type: "image", name: "image", label: "Image" },
      ],
    },
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
      name: "emailSubjectTemplate",
      label: "Email Subject Template",
      required: true,
      description: "the text the email subject will be prepopulated with",
    },
    {
      type: "string",
      name: "emailBodyTemplate",
      label: "Email Body Template",
      required: true,
      description: "the text the email will be prepopulated with",
      ui: {
        component: "textarea",
      },
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
  ],
} satisfies Collection<false>;
