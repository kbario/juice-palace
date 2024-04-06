import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchOneEntry, Content } from "@builder.io/sdk-qwik";

// Define Builder's public API key and content model.
// TO DO: Replace with your Public API Key
export const BUILDER_MODEL = "page";

// Define a route loader function that loads
// content from Builder based on the URL.
export const useBuilderContent = routeLoader$(async () => {
  const apiKey = "d228e886f0514865b326a2359c82b9bb"; //env.get("PUBLIC_BUILDER_API_KEY");
  // if (!apiKey) return null;
  // Fetch content for the specified model using the API key.
  const builderContent = await fetchOneEntry({
    model: BUILDER_MODEL,
    apiKey,
  });

  // Return the fetched content.
  return builderContent;
});

// Define a component that renders Builder content
// using Qwik's Content component.
export default component$(() => {
  // Call the useBuilderContent function to get the content.
  const content = useBuilderContent();
  // Specify the content model, pass the fetched content,
  // and provide the Public API Key
  return (
    <Content
      model={BUILDER_MODEL}
      content={content.value}
      apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
    />
  );
});
