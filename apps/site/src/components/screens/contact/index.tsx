import { createMemo, For, Show } from "solid-js";
import client from "../../../../tina/__generated__/client";
import type { OpeningHoursQuery } from "../../../../tina/__generated__/types";
import { createTina, tinaField } from "../../../../tina/tina-helpers";

export default (props: {
  data: Awaited<ReturnType<typeof client.queries.openingHours>>;
}) => {
  const initialData = createTina<OpeningHoursQuery>(props.data).data;
  const data = createMemo(() => initialData().openingHours.locations);
  return (
    <>
      <For each={data()}>
        {(location) => {
          return (
            <Show when={!location?.hide}>
              <section class="flex flex-col gap-2">
                <div class="flex flex-col">
                  <h3 data-tina-field={tinaField(location, "displayName")}>
                    {location?.displayName}
                  </h3>
                  <Show when={location?.desc}>
                    <p
                      class="text-content-light"
                      data-tina-field={tinaField(location, "desc")}>
                      {location?.desc}
                    </p>
                  </Show>
                </div>
                <Show when={location?.times}>
                  <p data-tina-field={tinaField(location, "times")}>
                    {location?.times}
                  </p>
                </Show>
                <Show when={location?.mapLocation}>
                  <div class="w-full h-52">
                    <iframe
                      src={location?.mapLocation}
                      width="100%"
                      height="100%"
                      style="border:0;"
                      allowfullscreen={false}
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </Show>
              </section>
            </Show>
          );
        }}
      </For>
    </>
  );
};
