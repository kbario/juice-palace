import {
  black,
  current,
  inherit,
  transparent,
  white,
} from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const HEADER_HEIGHT = 90;
const SECONDARY_HEADER_HEIGHT = 64;

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  theme: {
    colors: {
      transparent,
      current,
      inherit,
      black,
      white,
      ...[
        ["content", ["full", "default", "light"]],
        ["primary", ["content", "default"]],
        [
          "surface",
          ["default", "container", "container-low", "container-high"],
        ],
      ].reduce((acc, [semantics, variants]) => {
        acc[semantics] = variants.reduce((acc, x) => {
          acc[x] = `rgb(var(--${semantics}-${x}) / <alpha-value>)`;
          acc[`${x}-light`] =
            `color-mix(in srgb, rgb(var(--${semantics}-${x}) / <alpha-value>), white 10%)`;
          acc[`${x}-dark`] =
            `color-mix(in srgb, rgb(var(--${semantics}-${x}) / <alpha-value>), black 10%)`;
          return acc;
        }, {});
        return acc;
      }, {}),
    },
    extend: {
      fontFamily: {
        sans: ["Noto Sans Variable", ...defaultTheme.fontFamily.sans],
      },
      height: {
        header: `${HEADER_HEIGHT}px`,
        "secondary-header": `${SECONDARY_HEADER_HEIGHT}px`,
        "combined-header": `${HEADER_HEIGHT + SECONDARY_HEADER_HEIGHT}px`,
        view: [
          `calc(100vh - ${HEADER_HEIGHT}px)`,
          `calc(100svh - ${HEADER_HEIGHT}px)`,
        ],
        viewi: [
          `calc(100vh - ${HEADER_HEIGHT * 2}px)`,
          `calc(100svh - ${HEADER_HEIGHT * 2}px)`,
        ],
      },
      minHeight: {
        header: `${HEADER_HEIGHT}px`,
        "secondary-header": `${SECONDARY_HEADER_HEIGHT}px`,
        "combined-header": `${HEADER_HEIGHT + SECONDARY_HEADER_HEIGHT}px`,
        view: [
          `calc(100vh - ${HEADER_HEIGHT}px)`,
          `calc(100svh - ${HEADER_HEIGHT}px)`,
        ],
        viewi: [
          `calc(100vh - ${HEADER_HEIGHT * 2}px)`,
          `calc(100svh - ${HEADER_HEIGHT * 2}px)`,
        ],
      },
      spacing: {
        header: `${HEADER_HEIGHT}px`,
        "secondary-header": `${SECONDARY_HEADER_HEIGHT}px`,
        "combined-header": `${HEADER_HEIGHT + SECONDARY_HEADER_HEIGHT}px`,
      },
    },
  },
};

export default config;

/*
https://uicolors.app/create
primary green #548627
'50': 'hsl(88, 60%, 95%)',
'100': 'hsl(87, 56%, 89%)',
'200': 'hsl(88, 58%, 80%)',
'300': 'hsl(89, 55%, 67%)',
'400': 'hsl(90, 51%, 55%)',
'500': 'hsl(91, 52%, 44%)',
'600': 'hsl(92, 55%, 34%)', <-
'700': 'hsl(93, 51%, 27%)',
'800': 'hsl(93, 45%, 23%)',
'900': 'hsl(95, 40%, 20%)',
'950': 'hsl(96, 53%, 10%)',
*/
