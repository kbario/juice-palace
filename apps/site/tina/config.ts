import type { TinaField } from "tinacms";
import { defineConfig } from "tinacms";
import type {
  MenuSectionItems,
  MenuSectionItemsSizing,
  MenuSectionSubgroups,
  MenuSectionSubgroupsItems,
  MenuSectionSubgroupsItemsSizing,
} from "./__generated__/types";

export const Dietary = {
  Vegan: "Vegan",
  Vegetarian: "Vegetarian",
  GlutenFree: "Gluten Free",
  ContainsNuts: "Contains Nuts",
} as const;

export const DietaryOptions = Object.values(Dietary);

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.GITHUB_HEAD_REF ||
  process.env.HEAD ||
  "main";

const numberValidation = (val?: string): string | undefined | void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!val || val?.trim() === "") return;
  if (!isNaN(Number(val))) return;
  return "This needs to be a number";
};

const numberStringSettings = {
  parse: (val: string) => val,
  validate: numberValidation,
} satisfies TinaField<false>["ui"];

const menuItems = [
  {
    type: "string",
    label: "Menu Item Title",
    name: "title",
    required: true,
  },
  {
    type: "string",
    label: "Menu Item Description",
    name: "desc",
  },
  {
    type: "string",
    label: "Menu Item Price",
    name: "price",
    required: false,
    ui: numberStringSettings,
  },
  {
    list: true,
    label: "Menu Item Sizing",
    name: "sizing",
    type: "object",
    ui: {
      itemProps: (item: MenuSectionItemsSizing) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!item || !item.size || !item.price) return {};
        // Field values are accessed by item?.<Field name>
        return { label: `${item.size} - $${item.price}` };
      },
    },
    fields: [
      {
        type: "string",
        label: "Menu Item Size",
        name: "size",
        options: ["Small", "Large"],
        required: true,
      },
      {
        type: "number",
        label: "Menu Item Price",
        name: "price",
        required: true,
      },
    ],
  },
  {
    list: true,
    label: "Dietary",
    name: "dietary",
    type: "string",
    options: DietaryOptions,
  },
] satisfies TinaField<false>[];

const asdf = (item: MenuSectionItems | MenuSectionSubgroupsItems) => {
  if (!item.title) return {};
  let label = item.title;
  const price = item.sizing?.length
    ? item.sizing
        .filter((x) => !!x)
        .reduce(
          (
            acc: string,
            x: MenuSectionItemsSizing | MenuSectionSubgroupsItemsSizing,
            i: number,
            arr: (MenuSectionItemsSizing | MenuSectionSubgroupsItemsSizing)[],
          ) =>
            (acc += `${x.size}: $${x.price}${
              i !== arr.length - 1 ? ", " : ""
            }`),
          "",
        )
    : item.price || item.price === "0"
      ? `$${item.price}`
      : null;
  if (price) label = `${label} - ${price}`;
  if (item.desc) label = `${label} - ${item.desc}`;
  // Field values are accessed by item?.<Field name>
  return { label };
};
const groupObject: TinaField<false>[] = [
  {
    type: "string",
    label: "Section Title",
    name: "title",
    description: "",
    required: true,
  },
  {
    type: "string",
    label: "Section Description",
    name: "desc",
    description: "",
  },
  {
    type: "string",
    label: "Section Price",
    name: "price",
    description: "",
    ui: numberStringSettings,
  },
  {
    list: true,
    label: "Section Items",
    name: "items",
    type: "object",
    description: "",
    fields: menuItems,
    ui: {
      itemProps: asdf,
    },
  },
];

const subgroups = groupObject.map((x: TinaField<false>) => ({
  ...x,
  label:
    x.label &&
    typeof x.label === "string" &&
    x.label.replace("Section", "Subsection"),
}));
const subgroupObject = {
  list: true,
  label: "Menu Subsections",
  name: "subgroups",
  type: "object",
  fields: subgroups,
  ui: {
    itemProps: (item: MenuSectionSubgroups) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return { label: item?.title };
    },
  },
} satisfies TinaField<false>;

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID || import.meta.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN || import.meta.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "./images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        label: "Home Page",
        name: "home",
        path: "content/home",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
            // createNestedFolder: false,
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
            description:
              "Will only show 2. First is primary colour, second is grey",
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
      },
      {
        label: "Menu",
        name: "menu",
        path: "content/menu",
        ui: {
          // global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => {
            return "/menu";
          },
        },
        fields: [
          {
            type: "object",
            label: "Sections",
            name: "section",
            list: true,
            ui: {
              itemProps: asdf,
            },
            fields: [...groupObject, subgroupObject],
          },
        ],
      },
      {
        label: "Contact",
        name: "openingHours",
        path: "content/openingHours",
        ui: {
          // global: true,
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
      },
    ],
  },
});
