import client from '../../../../tina/__generated__/client';
import type {
  Groups,
  GroupsConnection,
  GroupsConnectionQuery,
  GroupsItems,
  GroupsSubgroups,
  GroupsSubgroupsItems,
} from '../../../../tina/__generated__/types';

import { createTina, tinaField } from '../../../../tina/tina-helpers';
import { mapDietaryToSymbol } from '../../../helpers/dietary';
import { type Dietary } from '../../../constants/dietary';
import { createEffect, createMemo, For } from 'solid-js';

type Group = Pick<
  Groups,
  'title' | '__typename' | 'desc' | 'price' | 'items' | 'subgroups'
>;
type Subgroup = Pick<
  GroupsSubgroups,
  'title' | '__typename' | 'desc' | 'price' | 'items'
>;

export default (props: {
  groups: Awaited<ReturnType<typeof client.queries.groupsConnection>>;
}) => {
  const initialData = createTina<GroupsConnectionQuery>(props.groups).data;
  const data = createMemo(() =>
    initialData()?.groupsConnection?.edges?.map((x) => x?.node)
  );
  return (
    <>
      <For each={data()}>
        {(group) => (
          <section class='flex max-w-screen-sm flex-col'>
            {group && <MenuHeading data={group} />}
            {!!group?.items?.length && (
              <ul>
                {group.items.map((item, idx) => (
                  <li>{item && <Item data={item} />}</li>
                ))}
              </ul>
            )}
            {!!group?.subgroups?.length && (
              <ul>
                {group.subgroups.map((subgroup, idx) => (
                  <li>
                    {subgroup && <MenuHeading data={subgroup} />}
                    {!!subgroup?.items?.length && (
                      <ul>
                        {subgroup.items.map((item, idx) => (
                          <li>{item && <Item data={item} />}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </For>
    </>
  );
};

const MenuHeading = (group: { data: Partial<Group | Subgroup> }) => {
  return (
    <div class='flex justify-between'>
      <div class='flex flex-col'>
        {group.data.__typename === 'Groups' ? (
          <h2
            class='text-2xl'
            data-tina-field={tinaField(group.data, 'title')}>
            {group.data.title}
          </h2>
        ) : (
          <h3
            class='text-xl'
            data-tina-field={tinaField(group.data, 'title')}>
            {group.data.title}
          </h3>
        )}
        {group.data.desc && (
          <span
            class='text-zinc-600'
            data-tina-field={tinaField(group.data, 'desc')}>
            {group.data.desc}
          </span>
        )}
      </div>
      {group.data.price && (
        <span
          classList={{
            'text-2xl': group.data.__typename === 'Groups',
            'text-xl': group.data.__typename === 'GroupsSubgroups',
          }}
          data-tina-field={tinaField(group.data, 'price')}>
          ${group.data.price}
        </span>
      )}
    </div>
  );
};

const Item = (item: { data: Partial<GroupsItems | GroupsSubgroupsItems> }) => {
  return (
    <div class='flex justify-between'>
      <div class='flex flex-col'>
        <div class='flex items-center gap-2'>
          <h4
            class='text-xl'
            data-tina-field={tinaField(item.data, 'title')}>
            {item.data.title}
          </h4>
          {!!item.data.dietary?.length && (
            <ul
              class='flex items-center gap-1'
              data-tina-field={tinaField(item.data, 'dietary')}>
              {item.data.dietary.map(
                (d, i) => d && <li>{mapDietaryToSymbol(d as Dietary)}</li>
              )}
            </ul>
          )}
        </div>
        {item.data.desc && (
          <span data-tina-field={tinaField(item.data, 'desc')}>
            {item.data.desc}
          </span>
        )}
      </div>
      {item.data.price && (
        <span data-tina-field={tinaField(item.data, 'price')}>
          ${item.data.price}
        </span>
      )}
      {!!item.data.sizing?.length && (
        <ul>
          {item.data.sizing.map((size, idx) => (
            <li class='flex'>
              {size?.size && (
                <span data-tina-field={tinaField(size, 'size')}>
                  {size.size}
                </span>
              )}
              {size?.price && (
                <span data-tina-field={tinaField(size, 'price')}>
                  ${size.price}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
