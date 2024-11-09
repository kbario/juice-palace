import type { Collection, TinaField } from "tinacms";
import type {
  MenuSectionItems,
  MenuSectionItemsSizing,
  MenuSectionSubgroups,
  MenuSectionSubgroupsItems,
  MenuSectionSubgroupsItemsSizing,
} from "../__generated__/types";

export const Dietary = {
  Vegan: "Vegan",
  Vegetarian: "Vegetarian",
  GlutenFree: "Gluten Free",
  ContainsNuts: "Contains Nuts",
} as const;

export const DietaryOptions = Object.values(Dietary);

const numberValidation = (val?: string): string | undefined | void => {
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
      return { label: item?.title };
    },
  },
} satisfies TinaField<false>;

export const MENU = {
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
} satisfies Collection<false>;
