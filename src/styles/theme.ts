import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#F97A9F', // primary700
    secondary: '#FFDFEC', // primary300
    primary500: '#FEBFDA',
    g200: '#D9D9D9',
    g400: '#AAA4AF',
    g500: '#7C7580',
    background: 'radial-gradient(ellipse at 50% 50%, #FEDCE9 0%, #FFFFFF 100%)',
    white: '#FFFFFF',
    black: '#000000',
    text: '#1C1B1D',
    error: '#dc3545',
    success: '#28a745',
  },

  fonts: {
    main: '"S-Core Dream", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    size: {
      small: '14px',
      medium: '16px',
      large: '20px',
    },

    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },

    style: {
      normal: 'normal',
      italic: 'italic',
    },

    lineHeight: {
      normal: 'normal',
      tight: '1.2',
      relaxed: '1.6',
    },
  },

  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  },
};
