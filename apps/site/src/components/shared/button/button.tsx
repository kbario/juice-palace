import { type ButtonRootProps, Root } from '@kobalte/core/button';
import { type ParentComponent } from 'solid-js';

export const Button: ParentComponent<ButtonRootProps> = (props) => {
  return <Root class='bg-grey-300 rounded px-2 py-1.5'>{props.children}</Root>;
};
