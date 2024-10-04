import { type ParentComponent } from "solid-js";

export const MobileNav: ParentComponent = (props) => {
  return (
    <button class="bg-grey-300 rounded sm:hidden fixed bottom-0 right-0 w-20 h-20">
      {props.children}
    </button>
  );
};
