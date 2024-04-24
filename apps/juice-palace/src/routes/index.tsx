import { component$ } from "@builder.io/qwik";
import Image from "../media/jp.png?jsx";

// Define a component that renders Builder content
// using Qwik's Content component.
export default component$(() => (
  <div class="h-1/2 w-full overflow-hidden">
    <Image class="w-full" />
  </div>
));
