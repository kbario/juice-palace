import { Root } from "@kobalte/core/button";
import {
  splitProps,
  type ComponentProps,
  type ParentComponent,
} from "solid-js";
import cn from "../../../lib/cn";
import { buttonCva, type buttonCvaOptions } from "./button.cva";

export const Button: ParentComponent<
  ComponentProps<typeof Root> & buttonCvaOptions
> = (props) => {
  const [local, cva, rest] = splitProps(
    props,
    ["children", "class"],
    ["appearance", "size"],
  );
  return (
    <Root class={cn(buttonCva(cva), local.class)} {...rest}>
      {props.children}
    </Root>
  );
};
