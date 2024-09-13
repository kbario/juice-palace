import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

type ErrorProps = PropsOf<"div"> & {
  name?: string;
};

export const Error = component$<ErrorProps>(({ class: asdf, ...props }) => (
  <div
    {...props}
    id={`${name}-error`}
    class={cn("text-alert px-3 text-sm font-medium", asdf)}
  >
    <Slot />
  </div>
));

export default Error;
