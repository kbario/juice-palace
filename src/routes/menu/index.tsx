import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchEntries } from "@builder.io/sdk-qwik";

// TO DO: Add your Public API Key
// export const apiKey = import.meta.env.BUILDER_API_KEY;

export const useLoader = routeLoader$(async () => {
  const apiKey = "d228e886f0514865b326a2359c82b9bb"; //requestEvent.env.get("PUBLIC_BUILDER_API_KEY");
  // if (!apiKey) return null;
  return fetchEntries({
    model: "menu",
    //   apiKey: apiKey,
    apiKey,
  });
});

export default component$(() => {
  //   const linksResource = useResource$((a) =>
  //     fetchEntries({
  //       model: "Menu",
  //     //   apiKey: apiKey,
  //     apiKey: a.
  //     }),
  //   );
  const asdf = useLoader();
  // console.log(
  //   JSON.parse(
  //     JSON.stringify(asdf.value?.[0]?.data?.menuCategory[1].menuItems),
  //   ),
  // );

  return (
    <div class="flex flex-col items-start">
      {asdf.value?.[0].data?.menuCategory.map((x: any, i: number) => (
        <section key={i}>
          <h1>{x?.menuCategoryTitle}</h1>
          {x.menuCategoryDesc && <p>{x.menuCategoryDesc}</p>}
          <ul>
            {x.menuItems &&
              x.menuItems.map((y: any, i: number) => (
                <li key={i}>
                  <h2>{y.menuItemTitle}</h2>
                  <p>{y.menuItemDesc}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
  //   return (
  //     <Resource
  //       value={asdf}
  //       onPending={() => <>Loading...</>}
  //       onRejected={(error) => <>Error: {error.message}</>}
  //       onResolved={(links) => (
  //         <header>
  //           <h1>My Integrated Data</h1>
  //           <nav>
  //             {links?.map((link, index) => (
  //               <a key={index} href={link.data.url}>
  //                 {link.data.label}
  //               </a>
  //             ))}
  //           </nav>
  //         </header>
  //       )}
  //     />
  //   );
});
