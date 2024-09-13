import { component$, type PropsOf } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import Label from "./label";
import Error from "./error";

type InputProps = PropsOf<"input"> & {
  error?: string;
  label?: string;
};

export const Input = component$<InputProps>(
  ({
    name,
    error,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "bind:checked": checkedSig,
    ...props
  }) => {
    return (
      <div class="flex flex-col gap-1">
        {props.label && <Label for={name}>{props.label}</Label>}
        <input
          {...props}
          aria-errormessage={`${name}-error`}
          aria-invalid={!!error}
          class={cn(
            "border-input placeholder:text-muted-foreground focus-visible:ring-ring bg-background text-foreground file:text-foreground flex h-12 w-full rounded border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            props.class,
          )}
          id={name}
        />
        {error && <Error name={name}>{error}</Error>}
      </div>
    );
  },
);

export default Input;
