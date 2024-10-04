import { Dialog } from "@kobalte/core/dialog";
import type { Component } from "solid-js";
import { HiOutlineBars3, HiOutlineXCircle } from "solid-icons/hi";
import {
  createMemo,
  createSignal,
  type JSXElement,
  type ParentComponent,
} from "solid-js";
import { Motion } from "solid-motionone";
import "./style.css";

export const BottomSheet: ParentComponent<{
  title: string;
  trigger?: JSXElement;
}> = (props) => {
  // const [open, setOpen] = createSignal(false);

  return (
    <Dialog
    // open={open()}
    // onOpenChange={setOpen}
    >
      <Dialog.Trigger class="dialog__trigger flex items-center justify-center w-12 h-12 rounded-full hover:bg-grey-500/90">
        {/* <Burger isOpen={open()}></Burger> */}
        <HiOutlineBars3></HiOutlineBars3>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <Dialog.Content class="dialog__content bottom-0 fixed z-50 w-full flex flex-col gap-4 max-w-full rounded-lg px-4 py-6 bg-surface-default">
          <div class="flex justify-between items-center px-2">
            <Dialog.Title class="font-bold uppercase text-base">
              {props.title}
            </Dialog.Title>
            <Dialog.CloseButton class="flex items-center justify-center rounded-full w-8 h-8">
              <HiOutlineXCircle></HiOutlineXCircle>
            </Dialog.CloseButton>
          </div>
          <Dialog.Description class="dialog__description">
            {props.children}
          </Dialog.Description>
        </Dialog.Content>
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
      role="button"
    >
      <Motion.div
        id={BURGER_TOP}
        class={burger}
        animate={{
          transform: props.isOpen
            ? `translateY(4.5px) rotate(-${rotateAmount()}deg)`
            : "translateY(0px) rotate(0deg)",
          width: props.isOpen ? "17px" : "100%",
        }}
      ></Motion.div>
      <Motion.div
        id={BURGER_MIDDLE}
        class={burger}
        animate={{
          opacity: props.isOpen ? "0%" : "100%",
          width: props.isOpen ? "1.5px" : "100%",
          transform: props.isOpen ? "translateX(7.5px)" : "translate(0)",
        }}
      ></Motion.div>
      <Motion.div
        id={BURGER_BOTTOM}
        class={burger}
        animate={{
          transform: props.isOpen
            ? `translateY(-4.5px) rotate(${rotateAmount()}deg)`
            : "translateY(0px) rotate(0deg)",
          width: props.isOpen ? "17px" : "100%",
        }}
      ></Motion.div>
    </div>
  );
};

export default Burger;
