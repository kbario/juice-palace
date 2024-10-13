import { type ParentComponent } from "solid-js";
import type { LinkConfig } from "../../../types/links";
import { Footer } from "../footer/footer";

type ScrollContainerProps = {
  links?: LinkConfig[];
};

export const ScrollContainer: ParentComponent<ScrollContainerProps> = (
  props,
) => {
  return (
    <div class="flex flex-col min-h-view m-auto max-w-4xl overflow-auto p-6 gap-8">
      {props.children}
      <Footer />
    </div>
  );
};
