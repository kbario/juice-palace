import type { Signal } from "@builder.io/qwik";
import {
  useComputed$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

/**
 * Grab the field name for the given attribute
 * to signal to Tina which DOM element the field
 * is working with.
 */
export const tinaField = <
  T extends object & {
    _content_source?: {
      queryId: string;
      path: (number | string)[];
    };
  },
>(
  object?: T,
  property?: Exclude<keyof NonNullable<T>, "__typename" | "_sys">,
  index?: number,
): string => {
  let _a, _b, _c;
  if (!object) {
    return "";
  }
  if (object._content_source) {
    if (!property) {
      return [
        (_a = object._content_source) == null ? void 0 : _a.queryId,
        object._content_source.path.join("."),
      ].join("---");
    }
    if (typeof index === "number") {
      return [
        (_b = object._content_source) == null ? void 0 : _b.queryId,
        [...object._content_source.path, property, index].join("."),
      ].join("---");
    }
    return [
      (_c = object._content_source) == null ? void 0 : _c.queryId,
      [...object._content_source.path, property].join("."),
    ].join("---");
  }
  return "";
};
const hashFromQuery = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash + char) & 4294967295;
  }
  const nonNegativeHash = Math.abs(hash);
  const alphanumericHash = nonNegativeHash.toString(36);
  return alphanumericHash;
};
export function useTina<T extends object>(props: {
  query: string;
  variables: object;
  data: T;
}): {
  data: Signal<T>;
  isClient: Signal<boolean>;
} {
  const id = useComputed$(() =>
    hashFromQuery(
      JSON.stringify({
        query: props.query,
        variables: props.query,
      }),
    ),
  );
  const data = useSignal(props.data);
  const isClient = useSignal(false);
  const quickEditEnabled = useSignal(false);
  const isInTinaIframe = useSignal(false);
  useVisibleTask$(() => {
    isClient.value = parent.location.toString().includes("admin");
    quickEditEnabled.value = parent.location.toString().includes("admin");
  });
  useTask$(({ track }) => {
    track(quickEditEnabled);
    if (quickEditEnabled.value) {
      const mouseDownHandler = function (e: MouseEvent) {
        if (!e.target) return;
        const attributeNames = (e.target as Element).getAttributeNames();
        const tinaAttribute = attributeNames.find((name: string) =>
          name.startsWith("data-tina-field"),
        );
        let fieldName;
        if (tinaAttribute) {
          e.preventDefault();
          e.stopPropagation();
          fieldName = (e.target as Element).getAttribute(tinaAttribute);
        } else {
          const ancestor = (e.target as Element).closest(
            "[data-tina-field], [data-tina-field-overlay]",
          );
          if (ancestor) {
            const attributeNames2 = ancestor.getAttributeNames();
            const tinaAttribute2 = attributeNames2.find((name: string) =>
              name.startsWith("data-tina-field"),
            );
            if (tinaAttribute2) {
              e.preventDefault();
              e.stopPropagation();
              fieldName = ancestor.getAttribute(tinaAttribute2);
            }
          }
        }
        if (fieldName) {
          if (isInTinaIframe.value) {
            parent.postMessage(
              { type: "field:selected", fieldName },
              window.location.origin,
            );
          }
        }
      };
      const style = document.createElement("style");
      style.type = "text/css";
      style.textContent = `
        [data-tina-field] {
          outline: 2px dashed rgba(34,150,254,0.5);
          transition: box-shadow ease-out 150ms;
        }
        [data-tina-field]:hover {
          box-shadow: inset 100vi 100vh rgba(34,150,254,0.3);
          outline: 2px solid rgba(34,150,254,1);
          cursor: pointer;
        }
        [data-tina-field-overlay] {
          outline: 2px dashed rgba(34,150,254,0.5);
          position: relative;
        }
        [data-tina-field-overlay]:hover {
          cursor: pointer;
          outline: 2px solid rgba(34,150,254,1);
        }
        [data-tina-field-overlay]::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 20;
          transition: opacity ease-out 150ms;
          background-color: rgba(34,150,254,0.3);
          opacity: 0;
        }
        [data-tina-field-overlay]:hover::after {
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add("__tina-quick-editing-enabled");
      document.addEventListener("click", mouseDownHandler, true);
      return () => {
        document.removeEventListener("click", mouseDownHandler, true);
        document.body.classList.remove("__tina-quick-editing-enabled");
        style.remove();
      };
    }
  });
  useTask$(({ track }) => {
    track(isClient);
    if (isClient.value) {
      parent.postMessage(
        { type: "open", ...props, id: id.value },
        window.location.origin,
      );
      window.addEventListener("message", (event) => {
        if (event.data.type === "quickEditEnabled") {
          quickEditEnabled.value = event.data.value;
        }
        if (event.data.id === id.value && event.data.type === "updateData") {
          data.value = event.data.data;
          isInTinaIframe.value = true;
          quickEditEnabled.value = true;
          const anyTinaField = document.querySelector("[data-tina-field]");
          if (anyTinaField) {
            parent.postMessage(
              { type: "quick-edit", value: true },
              window.location.origin,
            );
          } else {
            parent.postMessage(
              { type: "quick-edit", value: false },
              window.location.origin,
            );
          }
        }
      });
      return () => {
        parent.postMessage(
          { type: "close", id: id.value },
          window.location.origin,
        );
      };
    }
  });
  return { data, isClient };
}
