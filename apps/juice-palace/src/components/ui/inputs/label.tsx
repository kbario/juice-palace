import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

type LabelProps = PropsOf<"label">;

export const Label = component$<LabelProps>(({ class: asdf, ...props }) => (
  <label {...props} class={cn("text-grey-800 px-3 text-sm font-medium", asdf)}>
    <Slot />
  </label>
));

export default Label;
