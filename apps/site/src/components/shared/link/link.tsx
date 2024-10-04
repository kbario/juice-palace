import { Root } from "@kobalte/core/link";
import {
  splitProps,
  type ComponentProps,
  type ParentComponent,
} from "solid-js";
import cn from "../../../lib/cn";
import { cva, type VariantProps } from "cva";

const link = cva({
  base: "rounded",
  variants: {
    appearance: {
      primary:
        "bg-primary-default text-primary-content hover:bg-primary-default/90",
      default:
        "bg-surface-default text-content-default hover:bg-surface-default/90",
    },
    size: {
      default: "px-2 py-1.5 text-base",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "default",
  },
});

export const Link: ParentComponent<
  ComponentProps<typeof Root> & VariantProps<typeof link>
> = (props) => {
  const [local, cva, rest] = splitProps(
    props,
    ["children", "class"],
    ["appearance", "size"],
  );
  return (
    <Root class={cn(link(cva), local.class)} {...rest}>
      {local.children}
    </Root>
  );
};
