import { cva, type VariantProps } from "cva";

export const buttonCva = cva({
  base: "transition-colors flex items-center justify-center",
  variants: {
    appearance: {
      primary:
        "bg-primary-default text-primary-content hover:bg-primary-default-dark",
      default:
        "bg-surface-container text-content-default hover:bg-surface-container-dark",
      ghost: "bg-none text-content-default hover:bg-black/10",
    },
    shape: {
      box: "rounded",
      circle: "rounded-full",
    },
    size: {
      small: "",
      regular: "px-4 py-2 gap-1",
      hug: "",
    },
  },
  compoundVariants: [
    { shape: "circle", size: "regular", class: "!h-12 !w-12" },
    { shape: "circle", size: "small", class: "!h-8 !w-8" },
  ],
  defaultVariants: {
    appearance: "default",
    size: "regular",
    shape: "box",
  },
});

export type buttonCvaOptions = VariantProps<typeof buttonCva>;
