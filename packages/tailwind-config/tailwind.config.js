const plugin = require('tailwindcss/plugin');
const colours = require('tailwindcss/colors');

const HEADER_HEIGHT = 80;

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.press': {
          transform: 'var(--transform-press)',
        },
        '.appear': {
          opacity: 1,
        },
        '.disappear': {
          opacity: 0,
        },
      });
    }),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      grey: colours.slate,
    },
    extend: {
      animation: {
        ripple: 'ripple 300ms linear 1',
      },
      boxShadow: {
        base: 'var(--shadow-base)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        'inner-btn': 'inset 0 -2px 2px 0 rgb(0 0 0 / 0.25);',
        'button-bezel':
          'inset 0 2px 0 0 hsla(0,0%,100%,.2),inset 0 -1px 0 0 rgba(0,0,0,.25),0 2px 6px 0 rgba(0,0,0,.1)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        alert: {
          DEFAULT: 'hsl(var(--alert))',
          foreground: 'hsl(var(--alert-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      borderRadius: {
        base: 'var(--border-radius)',
        sm: 'calc(var(--border-radius) + 0.125rem)',
        DEFAULT: 'calc(var(--border-radius) + 0.25rem)',
        md: 'calc(var(--border-radius) + 0.375rem)',
        lg: 'calc(var(--border-radius) + 0.5rem)',
        xl: 'calc(var(--border-radius) + 0.75rem)',
        '2xl': 'calc(var(--border-radius) + 1rem)',
        '3xl': 'calc(var(--border-radius) + 1.5rem)',
      },
      borderWidth: {
        base: 'var(--border-width)',
        DEFAULT: 'calc(var(--border-width) + 1px)',
        2: 'calc(var(--border-width) + 2px)',
        4: 'calc(var(--border-width) + 4px)',
        8: 'calc(var(--border-width) + 8px)',
      },
      height: {
        header: `${HEADER_HEIGHT}px`,
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
        view: [
          `calc(100vh - ${HEADER_HEIGHT}px)`,
          `calc(100svh - ${HEADER_HEIGHT}px)`,
        ],
        viewi: [
          `calc(100vh - ${HEADER_HEIGHT * 2}px)`,
          `calc(100svh - ${HEADER_HEIGHT * 2}px)`,
        ],
      },
      keyframes: {
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '100%',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0%',
          },
        },
      },
      spacing: {
        header: `${HEADER_HEIGHT}px`,
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
