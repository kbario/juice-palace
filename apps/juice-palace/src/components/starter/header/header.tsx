import { component$ } from "@builder.io/qwik";
import { JuicePalaceLogo } from "../icons/juice-palace-logo";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const links = [
    { display: "menu", href: "/menu" },
    { display: "events", href: "/events" },
    { display: "about", href: "/about" },
  ];
  return (
    <header class="flex items-center justify-between bg-slate-200 px-4 py-2">
      <Link href="/">
        <JuicePalaceLogo />
      </Link>
      <nav>
        <ul class="flex gap-1">
          {links.map((link, i) => (
            <li key={i}>
              <Link href={link.href}>{link.display}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
});
