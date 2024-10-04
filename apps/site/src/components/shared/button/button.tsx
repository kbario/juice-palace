import { Root } from "@kobalte/core/button";
import {
  splitProps,
  type ComponentProps,
  type ParentComponent,
} from "solid-js";
import cn from "../../../lib/cn";
import { cva, type VariantProps } from "cva";

const button = cva({
  base: "rounded px-2 py-1.5",
  // **or**
  // base: ["font-semibold", "border", "rounded"],
  variants: {
    appearance: {
      primary: "bg-primary-default text-primary-content",
      default: "bg-grey-default text-grey-content",
    },
    size: {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2 text-base",
    },
  },
  defaultVariants: {
    appearance: "primary",
    size: "medium",
  },
});

export const Button: ParentComponent<
  ComponentProps<typeof Root> & VariantProps<typeof button>
> = (props) => {
  const [local, cva, rest] = splitProps(
    props,
    ["children", "class"],
    ["appearance", "size"],
  );
  return (
    <Root class={cn(button(cva), local.class)} {...rest}>
      {props.children}
    </Root>
  );
};
