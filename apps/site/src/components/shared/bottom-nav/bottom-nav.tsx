import { Dialog } from "@kobalte/core/dialog";
import { HiOutlineBars3, HiOutlineXMark } from "solid-icons/hi";
import { createSignal, type JSXElement, type ParentComponent } from "solid-js";
import cn from "../../../lib/cn";
import { buttonCva } from "../button/button.cva";
import "./style.css";

export const BottomSheet: ParentComponent<{
  class?: string;
  title: string;
  trigger?: JSXElement;
}> = (props) => {
  const [open, setOpen] = createSignal(false);
  const ICON_SIZE = 24;

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger
        class={cn(
          buttonCva({ appearance: "default", shape: "circle" }),
          props.class,
        )}>
        <HiOutlineBars3 size={24} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div class="bottom-0 fixed z-50 w-full p-4">
          <Dialog.Content
            class={
              "dialog__content w-full flex flex-col gap-4 rounded-lg px-6 py-5 bg-surface-default"
            }>
            <div class="flex justify-between items-center">
              <Dialog.Title class="font-bold uppercase text-base">
                {props.title}
              </Dialog.Title>
              <Dialog.CloseButton
                class={buttonCva({
                  appearance: "ghost",
                  shape: "circle",
                  size: "small",
                })}>
                <HiOutlineXMark size={ICON_SIZE} />
              </Dialog.CloseButton>
            </div>
            <Dialog.Description class="dialog__description">
              {props.children}
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};
