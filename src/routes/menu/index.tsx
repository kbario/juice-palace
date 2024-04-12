import { component$ } from "@builder.io/qwik";
import client from "tina/__generated__/client";
import type {
  Groups,
  GroupsItems,
  GroupsSubgroups,
  GroupsSubgroupsItems,
} from "../../../tina/__generated__/types";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useTina, tinaField } from "tina/tina-qwik-helpers";
import { mapDietaryToSymbol } from "~/helpers/dietary";
import { type Dietary } from "~/constants/dietary";

type Group = Pick<
  Groups,
  "title" | "__typename" | "desc" | "price" | "items" | "subgroups"
>;
type Subgroup = Pick<
  GroupsSubgroups,
  "title" | "__typename" | "desc" | "price" | "items"
>;

export const useMenuData = routeLoader$(async () => {
  return await client.queries.groupsConnection();
});

export default component$(() => {
  const groups = useMenuData();
  const data = useTina({
    data: groups.value.data,
    query: groups.value.query,
    variables: groups.value.variables,
  });
  return (
    <>
      {data.data.groupsConnection.edges
        ?.map((x) => x?.node)
        .map((group, idx) => (
          <section key={idx} class="flex max-w-screen-sm flex-col">
            {group && <MenuHeading {...group} />}
            {!!group?.items?.length && (
              <ul>
                {group.items.map((item, idx) => (
                  <li key={idx}>
                    <Item {...item} />
                  </li>
                ))}
              </ul>
            )}
            {!!group?.subgroups?.length && (
              <ul>
                {group.subgroups.map((subgroup, idx) => (
                  <li key={idx}>
                    {subgroup && <MenuHeading {...subgroup} />}
                    {!!subgroup?.items?.length && (
                      <ul>
                        {subgroup.items.map((item, idx) => (
                          <li key={idx}>
                            <Item {...item} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
    </>
  );
});

const MenuHeading = component$<Partial<Group | Subgroup>>((group) => {
  console.log(group);
  return (
    <div class="flex justify-between">
      <div class="flex flex-col">
        {group.__typename === "Groups" ? (
          <h2 class="text-2xl" data-tina-field={tinaField(group, "title")}>
            {group.title}
          </h2>
        ) : (
          <h3 class="text-xl" data-tina-field={tinaField(group, "title")}>
            {group.title}
          </h3>
        )}
        {group.desc && (
          <span
            class="text-zinc-600"
            data-tina-field={tinaField(group, "desc")}
          >
            {group.desc}
          </span>
        )}
      </div>
      {group.price && (
        <span
          class={[
            {
              "text-2xl": group.__typename === "Groups",
              "text-xl": group.__typename === "GroupsSubgroups",
            },
          ]}
          data-tina-field={tinaField(group, "price")}
        >
          ${group.price}
        </span>
      )}
    </div>
  );
});

const Item = component$<Partial<GroupsItems | GroupsSubgroupsItems>>((item) => {
  console.log(item);
  return (
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <h4 class="text-xl" data-tina-field={tinaField(item, "title")}>
            {item.title}
          </h4>
          <ul class="flex items-center gap-1">
            {!!item.dietary?.length &&
              item.dietary.map(
                (d, i) =>
                  d && <li key={i}>{mapDietaryToSymbol(d as Dietary)}</li>,
              )}
          </ul>
        </div>
        {item.desc && (
          <span data-tina-field={tinaField(item, "desc")}>{item.desc}</span>
        )}
      </div>
      {item.price && (
        <span data-tina-field={tinaField(item, "price")}>${item.price}</span>
      )}
      {!!item.sizing?.length && (
        <ul>
          {item.sizing.map((size, idx) => (
            <li key={idx} class="flex">
              {size?.size && (
                <span data-tina-field={tinaField(size, "size")}>
                  {size.size}
                </span>
              )}
              {size?.price && (
                <span data-tina-field={tinaField(size, "price")}>
                  ${size.price}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
