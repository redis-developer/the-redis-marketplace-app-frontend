import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    borderColor: '#dee2e6',
    backgroundColor: '#fafafa',
    text: {
      primary: '#565b73'
    },
    primary: {
      main: '#0263e0'
    },
    secondary: {
      main: '#f22f46'
    },
    application: {
      main: '#008cff',
      light: '#ebf4ff'
    },
    integration: {
      main: '#f22f46',
      light: '#feecec'
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
