import type { Signal } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { JuicePalaceLogo } from "../icons/juice-palace-logo";
import { Link } from "@builder.io/qwik-city";
import { Button } from "@components/button/button";
import { animate } from "motion";

export default component$<{ isDrawerOpenS: Signal<boolean> }>(
  ({ isDrawerOpenS }) => {
    const links = [
      { display: "menu", href: "/menu" },
      { display: "events", href: "/events" },
      { display: "about", href: "/about" },
    ];
    return (
      <header class="bg-grey-200 flex items-center justify-between px-4 py-2">
        <Link href="/">
          <JuicePalaceLogo />
        </Link>
        <Burger isDrawerOpenS={isDrawerOpenS}></Burger>
        <nav class="hidden sm:flex">
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
  },
);

const BURGER_TOP = "menu-burger-top";
const BURGER_MIDDLE = "menu-burger-middle";
const BURGER_BOTTOM = "menu-burger-bottom";

type Link = { label: string; link: string };

type BurgerProps = { isDrawerOpenS: Signal<boolean> };

const AnimateBurger = (
  rotateAmount: number,
  isDrawerOpenS: boolean,
  topRef: Signal<Element | undefined>,
  middleRef: Signal<Element | undefined>,
  bottomRef: Signal<Element | undefined>,
) => {
  const deg = rotateAmount * 360;
  animate(topRef.value!, {
    transform: isDrawerOpenS
      ? `translateY(4.5px) rotate(-${deg + 45}deg)`
      : "translateY(0px) rotate(0deg)",
    width: isDrawerOpenS ? "17px" : "100%",
  });
  animate(middleRef.value!, {
    opacity: isDrawerOpenS ? "0%" : "100%",
    width: isDrawerOpenS ? "1.5px" : "100%",
    transform: isDrawerOpenS ? "translateX(7.5px)" : "translate(0)",
  });
  animate(bottomRef.value!, {
    transform: isDrawerOpenS
      ? `translateY(-4.5px) rotate(${deg + 45}deg)`
      : "translateY(0px) rotate(0deg)",
    width: isDrawerOpenS ? "17px" : "100%",
  });
};

const Burger = component$<BurgerProps>((props) => {
  const burger = "bg-grey-900 w-full h-[1.5px] rounded-full";
  const topRef = useSignal<Element>();
  const middleRef = useSignal<Element>();
  const bottomRef = useSignal<Element>();
  useTask$(({ track }) => {
    track(props.isDrawerOpenS);
    if (!topRef.value || !middleRef.value || !bottomRef.value) return;
    AnimateBurger(0.5, props.isDrawerOpenS.value, topRef, middleRef, bottomRef);
  });
  return (
    <Button
      class="shrink-0 sm:hidden"
      onClick$={() => (props.isDrawerOpenS.value = !props.isDrawerOpenS.value)}
    >
      <div class="flex h-[10.5px] w-[16.5px] flex-col justify-between">
        <div ref={topRef} id={BURGER_TOP} class={burger}></div>
        <div ref={middleRef} id={BURGER_MIDDLE} class={burger}></div>
        <div ref={bottomRef} id={BURGER_BOTTOM} class={burger}></div>
      </div>
    </Button>
  );
});

// export const HeaderPlaceholder = () => <div class="h-header w-full"></div>;
