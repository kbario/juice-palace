const HEADER_HEIGHT = 80;

// We want each package to be responsible for its own content.
const config = {
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      grey: {
        50: 'hsl(var(--colour-grey-50) / <alpha-value>)',
        100: 'hsl(var(--colour-grey-100) / <alpha-value>)',
        200: 'hsl(var(--colour-grey-200) / <alpha-value>)',
        300: 'hsl(var(--colour-grey-300) / <alpha-value>)',
        400: 'hsl(var(--colour-grey-400) / <alpha-value>)',
        500: 'hsl(var(--colour-grey-500) / <alpha-value>)',
        600: 'hsl(var(--colour-grey-600) / <alpha-value>)',
        700: 'hsl(var(--colour-grey-700) / <alpha-value>)',
        800: 'hsl(var(--colour-grey-800) / <alpha-value>)',
        900: 'hsl(var(--colour-grey-900) / <alpha-value>)',
        950: 'hsl(var(--colour-grey-950) / <alpha-value>)',
      },
      primary: {
        DEFAULT: 'hsl(var(--colour-primary) / <alpha-value>)',
        active: 'hsl(var(--colour-primary-active) / <alpha-value>)',
        content: 'hsl(var(--colour-primary-content) / <alpha-value>)',
        hover: 'hsl(var(--colour-primary-hover) / <alpha-value>)',
      },
      // primary: {
      //   DEFAULT: 'hsl(var(--colour-primary) / <alpha-value>)',
      //   active: 'hsl(var(--colour-primary-active) / <alpha-value>)',
      //   content: 'hsl(var(--colour-primary-content) / <alpha-value>)',
      //   hover: 'hsl(var(--colour-primary-hover) / <alpha-value>)',
      // },
    },
    extend: {
      animation: {
        ripple: 'ripple 300ms linear 1',
      },
      boxShadow: {
        'inner-btn': 'inset 0 -2px 2px 0 rgb(0 0 0 / 0.25);',
        'button-bezel':
          'inset 0 2px 0 0 hsla(0,0%,100%,.2),inset 0 -1px 0 0 rgba(0,0,0,.25),0 2px 6px 0 rgba(0,0,0,.1)',
      },
      cursor: {
        // eslint-disable-next-line quotes
        tree: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🌲</text></svg>"),auto`,
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
