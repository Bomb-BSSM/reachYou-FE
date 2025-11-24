import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#FF88BB',
    secondary: '#FFDFEC',
    background: '#FFD0E2',
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
