import { Root } from "@kobalte/core/link";
import {
  splitProps,
  type ComponentProps,
  type ParentComponent,
} from "solid-js";
import cn from "../../../lib/cn";
import { buttonCva, type buttonCvaOptions } from "../button/button.cva";

export const Link: ParentComponent<
  ComponentProps<typeof Root> & buttonCvaOptions
> = (props) => {
  const [local, cva, rest] = splitProps(
    props,
    ["children", "class"],
    ["appearance", "size"],
  );
  return (
    <Root class={cn(buttonCva(cva), local.class)} {...rest}>
      {local.children}
    </Root>
  );
};
