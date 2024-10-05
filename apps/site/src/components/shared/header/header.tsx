import { type Component } from "solid-js";
import type { LinkConfig } from "../../../types/links";
import { BottomSheet } from "../bottom-nav/bottom-nav";
import { Link } from "../link/link";
import { JuicePalaceLogo } from "../logo/logo";

type HeaderProps = {
  links: LinkConfig[];
};

export const Header: Component<HeaderProps> = (props) => {
  return (
    <div class="sticky top-0 px-6 pt-4">
      <header class="flex w-full justify-between items-center bg-surface-container px-4 py-2 rounded-lg">
        <Link appearance="ghost" size="hug" href="/" aria-label="home">
          <JuicePalaceLogo />
        </Link>
        <BottomSheet class="sm:hidden" title="Menu">
          <ul class="flex gap-2 w-full">
            {props.links.map((link) => {
              return (
                <li class="w-full rounded-lg flex">
                  <Link class="grow" href={link.link}>
                    <span class="flex gap-1 flex-col items-center justify-center">
                      <span class="text-xl">{link.emoji}</span>
                      <span>{link.display}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </BottomSheet>
        <nav class="hidden sm:block">
          <ul class="flex gap-1">
            {props.links.slice(1).map((link) => (
              <li>
                <Link href={link.link}>{link.display}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};
