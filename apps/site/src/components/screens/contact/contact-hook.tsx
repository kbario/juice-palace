import { createMemo, type Component } from "solid-js";
import {
  client,
  createTina,
  tinaField,
  type OpeningHoursQuery,
} from "../../../../tina";
import { buttonCva } from "../../shared/button/button.cva";

type HeaderProps = {
  data: Awaited<ReturnType<typeof client.queries.openingHours>>;
};

export const ContactHook: Component<HeaderProps> = (props) => {
  const initialData = createTina<OpeningHoursQuery>(props.data).data;
  const data = createMemo(() => initialData().openingHours);
  return (
    <>
      <p class="" data-tina-field={tinaField(data(), "contactDesc")}>
        {data().contactDesc}
      </p>
      <a
        class={buttonCva({ appearance: "primary" })}
        href={`mailto:${props.data.data.openingHours.contactEmail}`}>
        {data().contactBtnText}
      </a>
    </>
  );
};
