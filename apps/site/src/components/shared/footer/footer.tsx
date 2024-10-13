import { type Component } from "solid-js";
import type { LinkConfig } from "../../../types/links";

type HeaderProps = {
  links?: LinkConfig[];
};

export const Footer: Component<HeaderProps> = (props) => {
  return (
    <footer class="h-20 flex items-center justify-center">
      © 2024 Juice Palace
    </footer>
  );
};
