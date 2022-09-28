import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          backgroundColor: 'gray.900',
          color:'white',
          lineHeight: 'tall',
        },
        a: {
          color: 'teal.500',
        },
      }
    }
});
export default theme;