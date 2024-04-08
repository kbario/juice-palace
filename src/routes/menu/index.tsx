import { component$ } from "@builder.io/qwik";
import client from "../../../tina/__generated__/client";
import type {
  Groups,
  GroupsItems,
  GroupsSubgroups,
  GroupsSubgroupsItems,
} from "../../../tina/__generated__/types";
import { routeLoader$ } from "@builder.io/qwik-city";

type Group = Pick<
  Groups,
  "title" | "__typename" | "desc" | "price" | "items" | "subgroups"
>;
type Subgroup = Pick<
  GroupsSubgroups,
  "title" | "__typename" | "desc" | "price" | "items"
>;

export const useMenuData = routeLoader$(async () => {
  const asdf = await client.queries.groupsConnection();
  return asdf.data.groupsConnection.edges?.map((x) => x?.node) || [];
});

export default component$(() => {
  const groups = useMenuData();
  return (
    <>
      {groups.value.map((group, idx) => (
        <section key={idx} class="flex max-w-screen-sm flex-col">
          {group && <MenuHeading {...group} />}
          {group?.items?.length && (
            <ul>
              {group.items.map((item, idx) => (
                <li key={idx}>
                  <Item {...item} />
                </li>
              ))}
            </ul>
          )}
          {group?.subgroups?.length && (
            <ul>
              {group.subgroups.map((subgroup, idx) => (
                <li key={idx}>
                  {subgroup && <MenuHeading {...subgroup} />}
                  {subgroup?.items?.length && (
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
  return (
    <div class="flex justify-between">
      <div class="flex flex-col">
        {group.__typename === "Groups" ? (
          <h2 class="text-2xl">{group.title}</h2>
        ) : (
          <h3 class="text-xl">{group.title}</h3>
        )}
        {group.desc && <span class="text-zinc-600">{group.desc}</span>}
      </div>
      {group.price && (
        <span
          class={[
            {
              "text-2xl": group.__typename === "Groups",
              "text-xl": group.__typename === "GroupsSubgroups",
            },
          ]}
        >
          ${group.price}
        </span>
      )}
    </div>
  );
});

const Item = component$<Partial<GroupsItems | GroupsSubgroupsItems>>((item) => {
  return (
    <div class="flex justify-between">
      <div class="flex flex-col">
        <h4 class="text-xl">{item.title}</h4>
        {item.desc && <span>{item.desc}</span>}
      </div>
      {item.price && <span>${item.price}</span>}
      {item.sizing?.length && (
        <ul>
          {item.sizing.map((size, idx) => (
            <li key={idx} class="flex">
              <span>{size?.size}</span>
              <span>${size?.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
