import type { PropsOf } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import Label from "./label";
import Error from "./error";

type TextareaProps = PropsOf<"textarea"> & {
  error?: string;
  label?: string;
};

export const Textarea = component$<TextareaProps>(
  ({ name, error, ...props }) => {
    return (
      <div class="flex flex-col gap-1">
        {props.label && <Label for={name}>{props.label}</Label>}
        <textarea
          {...props}
          class={cn(
            "border-input placeholder:text-muted-foreground focus-visible:ring-ring [&::-webkit-scrollbar-track]:bg-blue flex min-h-[60px] w-full rounded border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            props.class,
          )}
        />
        {error && <Error name={name}>{error}</Error>}
      </div>
    );
  },
);
