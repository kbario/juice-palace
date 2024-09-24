import { createMemo, For, Show } from 'solid-js';
import client from '../../../tina/__generated__/client';
import { createTina } from '../../../tina/tina-helpers';
import type {
  OpeningHoursConnection,
  OpeningHoursConnectionQuery,
} from '../../../tina/__generated__/types';
import { formatDaysAndHours } from '../../helpers/days';
import { tinaField } from '../../../tina/tina-helpers';

export default (props: {
  locations: Awaited<ReturnType<typeof client.queries.openingHoursConnection>>;
}) => {
  const initialData = createTina<OpeningHoursConnectionQuery>(
    props.locations
  ).data;
  const data = createMemo(() =>
    initialData()?.openingHoursConnection?.edges?.flatMap(
      (x) => x?.node?.locations
    )
  );
  return (
    <>
      <For each={data()}>
        {(location) => {
          const a = createMemo(() => formatDaysAndHours(location?.times));
          return (
            <>
              <h2 data-tina-field={tinaField(location, 'displayName')}>
                {location?.displayName}
              </h2>
              <Show when={location?.desc}>
                <p data-tina-field={tinaField(location, 'desc')}>
                  {location?.desc}
                </p>
              </Show>
              <ul>
                <For each={a()}>
                  {(y) => (
                    <li data-tina-field={tinaField(location?.times[0], 'day')}>
                      {y}
                    </li>
                  )}
                </For>
              </ul>
              <iframe
                src={location?.mapLocation}
                width='600'
                height='450'
                style='border:0;'
                allowfullscreen={false}
                loading='lazy'
                referrerpolicy='no-referrer-when-downgrade'
              />
            </>
          );
        }}
      </For>
    </>
  );
};
