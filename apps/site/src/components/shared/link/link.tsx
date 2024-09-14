import { type LinkRootProps, Root } from '@kobalte/core/link';
import { splitProps, type ParentComponent } from 'solid-js';

export const Link: ParentComponent<LinkRootProps> = (props) => {
  const [local, rest] = splitProps(props, ['children']);
  return (
    <Root
      class='bg-grey-300 rounded px-2 py-1.5'
      {...rest}>
      {local.children}
    </Root>
  );
};
