import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      error: string;
      success: string;
    };
    fonts: {
      main: string;
      size: {
        small: string;
        medium: string;
        large: string;
      };
      weight: {
        regular: number;
        medium: number;
        bold: number;
      };
      style: {
        normal: string;
        italic: string;
      };

      lineHeight: {
        normal: string;
        tight: string;
        relaxed: string;
      };
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
