import type { TinaField } from "tinacms";
import { defineConfig } from "tinacms";
import type {
  GroupsItems,
  GroupsItemsSizing,
  GroupsSubgroups,
} from "./__generated__/types";

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
      itemProps: (item: GroupsItemsSizing) => {
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
] satisfies TinaField<false>[];

const groupObject: TinaField<false>[] = [
  {
    type: "string",
    label: "Group Title",
    name: "title",
    required: true,
  },
  {
    type: "string",
    label: "Group Description",
    name: "desc",
  },
  {
    type: "string",
    label: "Group Price",
    name: "price",
    ui: numberStringSettings,
  },
  {
    list: true,
    label: "Menu Items",
    name: "items",
    type: "object",
    fields: menuItems,
    ui: {
      itemProps: (item) => {
        if (!item.title) return {};
        let label = item.title;
        const price = item.sizing?.length
          ? item.sizing.reduce(
              (
                acc: string,
                x: GroupsItemsSizing,
                i: number,
                arr: GroupsItems[],
              ) =>
                (acc += `${x.size}: $${x.price}${i !== arr.length - 1 ? ", " : ""}`),
              "",
            )
          : item.price || item.price === 0
            ? `$${item.price}`
            : null;
        if (price) label = `${label} - ${price}`;
        // Field values are accessed by item?.<Field name>
        return { label };
      },
    },
  },
];

const subgroups = groupObject.map((x: TinaField<false>) => ({
  ...x,
  label:
    x.label &&
    typeof x.label === "string" &&
    x.label.replace("Group", "Subgroup"),
}));
const subgroupObject = {
  list: true,
  label: "Menu Subgroups",
  name: "subgroups",
  type: "object",
  fields: subgroups,
  ui: {
    itemProps: (item: GroupsSubgroups) => {
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
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        label: "Menu Groups",
        name: "groups",
        path: "content/menu",
        fields: [...groupObject, subgroupObject],
      },
      {
        label: "Opening Hours",
        name: "openingHours",
        path: "content/openingHours",
        fields: [
          {
            type: "string",
            label: "Day of the Week",
            name: "dayOfWeek",
            required: true,
            options: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
          },
          {
            type: "string",
            label: "Opening Time",
            name: "openingTime",
            required: true,
            ui: numberStringSettings,
          },
          {
            type: "string",
            label: "Closing Time",
            name: "closingTime",
            required: true,
            ui: numberStringSettings,
          },
        ],
      },
    ],
  },
});
