import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  type Accessor,
} from "solid-js";
import { isServer } from "solid-js/web";

export type CreateTinaProps<T> = {
  query: string;
  variables: object;
  data: T;
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

function createTina<T extends object>(
  props: CreateTinaProps<T>,
): {
  data: Accessor<T>;
  isEditing: Accessor<boolean>;
} {
  const id = createMemo(() =>
    hashFromQuery(
      JSON.stringify({
        query: props?.query,
        variables: props?.variables,
      }),
    ),
  );
  const [data, setData] = createSignal<T>(props.data);
  const [isClient, setIsClient] = createSignal(false);
  const [quickEditEnabled, setQuickEditEnabled] = createSignal(false);
  const [isInTinaIframe, setIsInTinaIframe] = createSignal(false);
  const isEditing = createMemo(
    () => isClient() && isInTinaIframe() && quickEditEnabled(),
  );
  createEffect(() => {
    setIsInTinaIframe(parent.location.toString().includes("admin"));
    setIsClient(!isServer);
    // setData(() => props.data);
  });
  createEffect(() => {
    if (quickEditEnabled()) {
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
          if (isInTinaIframe()) {
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
      onCleanup(() => {
        document.removeEventListener("click", mouseDownHandler, true);
        document.body.classList.remove("__tina-quick-editing-enabled");
        style.remove();
      });
    }
  });
  createEffect(() => {
    if (isClient()) {
      parent.postMessage(
        {
          type: "open",
          query: JSON.parse(JSON.stringify(props.query)),
          variables: JSON.parse(JSON.stringify(props.variables)),
          data: JSON.parse(JSON.stringify(props.data)),
          id: id(),
        },
        window.location.origin,
      );
      window.addEventListener("message", (event) => {
        if (event.data.type === "quickEditEnabled") {
          setQuickEditEnabled(event.data.value);
        }
        if (event.data.id === id() && event.data.type === "updateData") {
          setData(event.data.data);
          setIsInTinaIframe(true);
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
      onCleanup(() => {
        parent.postMessage({ type: "close", id: id() }, window.location.origin);
      });
    }
  });
  return { data, isEditing };
}

/**
 * Grab the field name for the given attribute
 * to signal to Tina which DOM element the field
 * is working with.
 */
function tinaField<
  T extends
    | (object & {
        _content_source?: {
          queryId: string;
          path: (number | string)[];
        };
      })
    | null,
>(
  object?: T,
  property?: Exclude<keyof NonNullable<T>, "__typename" | "_sys">,
  index?: number,
): string {
  var _a, _b, _c;
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
}

export { tinaField, createTina };
