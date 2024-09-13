import { component$, Slot, useSignal } from "@builder.io/qwik";

import Header from "@components/header/header";
import Drawer from "@components/drawer/drawer";

export default component$(() => {
  const isDrawerOpenS = useSignal(false);
  return (
    <>
      <Drawer isDrawerOpenS={isDrawerOpenS}></Drawer>
      <Header isDrawerOpenS={isDrawerOpenS} />
      <main>
        <Slot />
      </main>
    </>
  );
});
