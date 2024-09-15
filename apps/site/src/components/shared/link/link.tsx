import { type LinkRootProps, Root } from '@kobalte/core/link';
import { splitProps, type ParentComponent } from 'solid-js';

export const Link: ParentComponent<LinkRootProps> = (props) => {
  const [local, rest] = splitProps(props, ['children']);
  return (
    <Root
      class='rounded px-2 py-1.5 hover:bg-grey-900/10 hover:cursor-pointer'
      {...rest}>
      {local.children}
    </Root>
  );
};
