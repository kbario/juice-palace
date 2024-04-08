import { component$ } from "@builder.io/qwik";
import type { RequestEvent } from "@builder.io/qwik-city";

export const onGet = async ({ redirect }: RequestEvent) => {
  throw redirect(301, "/admin/index.html");
};

// Define a component that renders Builder content
// using Qwik's Content component.
export default component$(() => <div> hello </div>);
