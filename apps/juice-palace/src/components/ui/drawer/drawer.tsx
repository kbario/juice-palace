import type { Signal } from "@builder.io/qwik";
import { component$, useStyles$ } from "@builder.io/qwik";
import { Label, Modal, ModalDescription, ModalTitle } from "@qwik-ui/headless";

import styles from "./drawer.css?inline";

export default component$<{ isDrawerOpenS: Signal<boolean> }>(
  ({ isDrawerOpenS }) => {
    useStyles$(styles);

    return (
      <Modal class="modal sheet" bind:show={isDrawerOpenS}>
        <ModalTitle>Edit Profile</ModalTitle>
        <ModalDescription>
          You can update your profile here. Hit the save button when finished.
        </ModalDescription>
        <Label>
          Name
          <input type="text" placeholder="John Doe" />
        </Label>
        <Label>
          Email
          <input type="text" placeholder="johndoe@gmail.com" />
        </Label>
        <footer>
          <button onClick$={() => (isDrawerOpenS.value = false)}>Cancel</button>
          <button onClick$={() => (isDrawerOpenS.value = false)}>
            Save Changes
          </button>
        </footer>
      </Modal>
    );
  },
);
