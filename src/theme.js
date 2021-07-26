import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 8,
  typography: {
    fontFamily: "'Mulish', sans-serif"
  },
  palette: {
    borderColor: '#dee2e6',
    popupBackgroundColor: '#fafafa',
    executionTimeBackground: '#fef9c4',
    icon: '#6f747a',
    appBar: {
      main: '#191E31',
      contrastText: '#fff'
    },
    footer: {
      main: '#292929',
      contrastText: '#fff'
    },
    text: {
      primary: '#292929',
      secondary: '#fff',
      third: '#292929'
    },
    primary: {
      main: '#5961ff',
      contrastText: '#fff'
    },
    secondary: {
      main: '#e8e8e8',
      contrastText: '#292929'
    },
    card: {
      contrastText: '#fff',
      main: '#ebf4ff',
      dark: '#d1e9ff'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#191E31'
    },
    filterCategoryColors: {
      type: {
        main: '#ef9a9a',
        contrastText: '#f44336'
      },
      language: {
        main: '#90caf9',
        contrastText: '#2196f3'
      },
      contributed_by: {
        main: '#b39ddb',
        contrastText: '#673ab7'
      },
      redis_modules: {
        main: '#80cbc4',
        contrastText: '#009688'
      },
      verticals: {
        main: '#ffeb3b',
        contrastText: '#fbc02d'
      },
      redis_features: {
        main: '#ffcc80',
        contrastText: '#ff9800'
      },
      redis_commands: {
        main: '#c5e1a5',
        contrastText: '#8bc34a'
      },
      special_tags: {
        main: '#f48fb1',
        contrastText: '#e91e63'
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
