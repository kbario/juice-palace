import { Dialog } from "@kobalte/core/dialog";
import { HiOutlineBars3, HiOutlineXMark } from "solid-icons/hi";
import type { Component } from "solid-js";
import {
  createMemo,
  createSignal,
  type JSXElement,
  type ParentComponent,
} from "solid-js";
import { Motion } from "solid-motionone";
import cn from "../../../lib/cn";
import "./style.css";
import { buttonCva } from "../button/button.cva";

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

export type BurgerProps = {
  isOpen: boolean;
};

const BURGER_TOP = "menu-burger-top";
const BURGER_MIDDLE = "menu-burger-middle";
const BURGER_BOTTOM = "menu-burger-bottom";

const burger = "bg-grey-800 w-full h-[1.5px] rounded";

const Burger: Component<BurgerProps> = (props) => {
  const rotateAmount = createMemo(() => 180 + 45);
  return (
    <div
      class="flex h-[10.5px] w-[16.5px] flex-col justify-between"
      style={{ width: "16.5px", height: "10.5px" }}
      aria-label="burger icon"
      role="button">
      <Motion.div
        id={BURGER_TOP}
        class={burger}
        animate={{
          transform: props.isOpen
            ? `translateY(4.5px) rotate(-${rotateAmount()}deg)`
            : "translateY(0px) rotate(0deg)",
          width: props.isOpen ? "17px" : "100%",
        }}></Motion.div>
      <Motion.div
        id={BURGER_MIDDLE}
        class={burger}
        animate={{
          opacity: props.isOpen ? "0%" : "100%",
          width: props.isOpen ? "1.5px" : "100%",
          transform: props.isOpen ? "translateX(7.5px)" : "translate(0)",
        }}></Motion.div>
      <Motion.div
        id={BURGER_BOTTOM}
        class={burger}
        animate={{
          transform: props.isOpen
            ? `translateY(-4.5px) rotate(${rotateAmount()}deg)`
            : "translateY(0px) rotate(0deg)",
          width: props.isOpen ? "17px" : "100%",
        }}></Motion.div>
    </div>
  );
};

export default Burger;
