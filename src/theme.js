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
      primary: '#3f4b5f'
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
    application: {
      main: '#008cff',
      light: '#ebf4ff'
    },
    buildingBlock: {
      main: '#606b85',
      light: '#f4f4f6'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
});

export default theme;
