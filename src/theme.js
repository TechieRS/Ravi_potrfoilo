import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e7fff8',
      100: '#b7ffe8',
      200: '#83ffd8',
      300: '#4fffc7',
      400: '#22f5b7',
      500: '#00e5a8',
      600: '#00b986',
      700: '#008d66',
      800: '#006247',
      900: '#003829',
    },
    signal: {
      50: '#e7fbff',
      100: '#b8f2ff',
      200: '#86e9ff',
      300: '#53dfff',
      400: '#25d4ff',
      500: '#00c2f5',
      600: '#0099c2',
      700: '#00708f',
      800: '#00495e',
      900: '#002530',
    },
    obsidian: {
      900: '#03070b',
      800: '#071016',
      700: '#0b171f',
      600: '#101f29',
    },
  },
  fonts: {
    heading: '"Inter", "Segoe UI", system-ui, sans-serif',
    body: '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: 'obsidian.900',
        color: 'whiteAlpha.900',
      },
      '::selection': {
        bg: 'brand.300',
        color: 'obsidian.900',
      },
    },
  },
  components: {
    Badge: {
      baseStyle: {
        borderRadius: '4px',
        letterSpacing: '0',
        textTransform: 'uppercase',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: '6px',
        fontWeight: '800',
      },
    },
    Tag: {
      baseStyle: {
        container: {
          borderRadius: '6px',
        },
      },
    },
  },
});
