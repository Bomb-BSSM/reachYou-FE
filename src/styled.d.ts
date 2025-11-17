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
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
