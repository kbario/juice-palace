import { For, type Component } from "solid-js";
import type { LinkConfig } from "../../../types/links";
import { BottomSheet } from "../bottom-nav/bottom-nav";
import { Link } from "../link/link";

const links: LinkConfig[] = [
  {
    display: "Home",
    link: "/",
    emoji: "🏠",
  },
  {
    display: "Menu",
    link: "/menu",
    emoji: "☕",
  },
  {
    display: "Contact",
    link: "/contact",
    emoji: "📞",
  },
];

export const Header: Component = () => {
  return (
    <div class="sticky top-0 px-6 pt-4">
      <header class="flex w-full justify-between items-center bg-surface-container px-4 py-2 rounded-lg">
        <Link
          appearance="ghost"
          // size="hug"
          href="/"
          aria-label="home">
          Home
        </Link>
        <BottomSheet class="sm:hidden" title="Menu">
          <ul class="flex gap-2 w-full">
            <For each={links}>
              {(link) => (
                <li class="w-full rounded-lg flex">
                  <Link class="grow" href={link.link}>
                    <span class="flex gap-1 flex-col items-center justify-center">
                      <span class="text-xl">{link.emoji}</span>
                      <span>{link.display}</span>
                    </span>
                  </Link>
                </li>
              )}
            </For>
          </ul>
        </BottomSheet>
        <nav class="hidden sm:block">
          <ul class="flex gap-1">
            <For each={links.slice(1)}>
              {(link) => (
                <li>
                  <Link href={link.link}>{link.display}</Link>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </header>
    </div>
  );
};
