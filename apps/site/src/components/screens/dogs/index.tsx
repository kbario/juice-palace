import { createMemo, For, Show } from "solid-js";
import client from "../../../../tina/__generated__/client";
import type { DogsQuery } from "../../../../tina/__generated__/types";
import { createTina, tinaField } from "../../../../tina/tina-helpers";
import { buttonCva } from "../../shared/button/button.cva";
import { Accordion } from "@kobalte/core/accordion";
import "./accordion.css";

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

export default (props: {
  data: Awaited<ReturnType<typeof client.queries.dogs>>;
}) => {
  const tina = createTina<DogsQuery>(props.data);
  const data = createMemo(() => tina.data().dogs);
  const linkBody = createMemo(() =>
    data().emailBodyTemplate.replaceAll("\n", "%0D%0A"),
  );
  const previewBody = createMemo(() => data().emailBodyTemplate.split("\n"));
  return (
    <>
      <Show when={tina.isEditing()}>
        <Accordion class="accordion" collapsible>
          <Accordion.Item value="" class="accordion__item">
            <Accordion.Header class="accordion__item-header">
              <Accordion.Trigger class="accordion__item-trigger">
                <h2>Body Preview</h2>
                <p>Only shown during admin editing</p>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion__item-content">
              <div
                class="flex flex-col p-4"
                data-tina-field={tinaField(data(), "emailBodyTemplate")}>
                <For each={previewBody()}>
                  {(x) => (x ? <div>{x}</div> : <br />)}
                </For>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Show>
      <For each={data().dogs}>
        {(dog) => (
          <Show when={!dog?.hide}>
            <div class="flex flex-col bg-surface-container rounded  max-w-sm">
              <Show when={dog?.image}>
                <div
                  data-tina-field={tinaField(dog, "image")}
                  class="flex justify-center rounded-t items-center overflow-hidden grow w-full h-56">
                  <img
                    class="shrink-0 min-h-full min-w-full"
                    src={dog!.image!}
                    alt={`picture of ${dog?.name}`}
                  />
                </div>
              </Show>
              <div class="flex flex-col gap-1 p-2">
                <h3 data-tina-field={tinaField(dog, "name")}>{dog?.name}</h3>
                <p data-tina-field={tinaField(dog, "birthday")}>
                  {getAge(dog?.birthday)}
                </p>
                <p data-tina-field={tinaField(dog, "desc")}>{dog?.desc}</p>
              </div>
            </div>
          </Show>
        )}
      </For>
      <p class="" data-tina-field={tinaField(data(), "contactDesc")}>
        {data().contactDesc}
      </p>
      <a
        class={buttonCva({ appearance: "primary" })}
        href={`mailto:${data().contactEmail}?subject=${data().emailSubjectTemplate}&body=${linkBody()}`}>
        {data().contactBtnText}
      </a>
    </>
  );
};
