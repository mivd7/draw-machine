import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          backgroundColor: 'gray.900',
          color:'whiteAlpha.900',
          lineHeight: 'tall',
        },
      },
      shadows: {
        white: '0 0 0 3px white'
      }
    }
});
export default theme;