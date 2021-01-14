import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 8,
  typography: {
    fontFamily: "'Montserrat', sans-serif"
  },
  palette: {
    borderColor: '#dee2e6',
    backgroundColor: '#fafafa',
    appBar: {
      main: '#fff',
      contrastText: '#6f747a'
    },
    footer: {
      main: '#3f4b5f',
      contrastText: '#fff'
    },
    text: {
      primary: '#3f4b5f',
      secondary: '#3f4b5f'
    },
    primary: {
      main: '#5961ff',
      contrastText: '#fff'
    },
    secondary: {
      main: '#e8e8e8',
      contrastText: '#3f4b5f'
    },
    tertiary: {
      main: '#f22f46',
      contrastText: '#fff',
      dark: '#b8001f',
      light: '#ff6a71'
    },
    card: {
      main: '#008cff',
      light: '#ebf4ff',
      dark: '#0060cb'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    },
    filterCategoryColors: {
      type: {
        main: '#ffebee',
        contrastText: '#ba000d',
        dark: '#ccb9bc',
        light: '#ffffff'
      },
      language: {
        main: '#e3f2fd',
        contrastText: '#0069c0',
        dark: '#b1bfca',
        light: '#eeffff'
      },
      contributed_by: {
        main: '#f3e5f5',
        contrastText: '#6a0080',
        dark: '#c0b3c2',
        light: '#fff1ff'
      },
      redis_modules: {
        main: '#e0f7fa',
        contrastText: '#008ba3',
        dark: '#aec4c7',
        light: '#e5ffff'
      },
      verticals: {
        main: '#e8f5e9',
        contrastText: '#087f23',
        dark: '#b6c2b7',
        light: '#fbfffc'
      },
      redis_features: {
        main: '#fffde7',
        contrastText: '#c66900',
        dark: '#cccab5',
        light: '#ffffe4'
      },
      redis_commands: {
        main: '#fff9c4',
        contrastText: '#c6a700',
        dark: '#cbc693',
        light: '#fffff7'
      },
      special_tags: {
        main: '#fce4ec',
        contrastText: '#b0003a',
        dark: '#c9b2ba',
        light: '#ffeeff'
      }
    },
    brandColors: {
      github: {
        main: '#24292e',
        contrastText: '#ffffff',
        dark: '#000004',
        light: '#4c5157'
      },
      heroku: {
        main: '#9e7cc1',
        contrastText: '#ffffff',
        dark: '#6e4f90',
        light: '#d0abf4'
      },
      google: {
        main: '#1a73e8',
        contrastText: '#ffffff',
        dark: '#0049b5',
        light: '#69a1ff'
      },
      vercel: {
        main: '#111111',
        contrastText: '#ffffff',
        dark: '#000000',
        light: '#373737'
      }
    }
  }
});

export default theme;
