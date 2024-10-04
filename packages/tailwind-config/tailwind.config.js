import plugin from 'tailwindcss/plugin';
import colours from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const HEADER_HEIGHT = 80;
const SECONDARY_HEADER_HEIGHT = 64;

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // grey: colours.slate,
      content: {
        full: 'rgb(var(--content-full) / <alpha-value>);',
        default: 'rgb(var(--content-default) / <alpha-value>);',
        light: 'rgb(var(--content-light) / <alpha-value>);',
      },
      primary: {
        content: 'rgb(var(--primary-content) / <alpha-value>)',
        default: 'rgb(var(--primary-default) / <alpha-value>)',
      },
      surface: {
        container: 'rgb(var(--surface-container) / <alpha-value>)',
        'container-low': 'rgb(var(--surface-container-low) / <alpha-value>)',
        'container-high': 'rgb(var(--surface-container-high) / <alpha-value>)',
        default: 'rgb(var(--surface-default) / <alpha-value>)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans Variable', ...defaultTheme.fontFamily.sans],
      },
      height: {
        header: `${HEADER_HEIGHT}px`,
        'secondary-header': `${SECONDARY_HEADER_HEIGHT}px`,
        'combined-header': `${HEADER_HEIGHT + SECONDARY_HEADER_HEIGHT}px`,
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
        'secondary-header': `${SECONDARY_HEADER_HEIGHT}px`,
        'combined-header': `${HEADER_HEIGHT + SECONDARY_HEADER_HEIGHT}px`,
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
        'secondary-header': `${SECONDARY_HEADER_HEIGHT}px`,
        'combined-header': `${HEADER_HEIGHT + SECONDARY_HEADER_HEIGHT}px`,
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
