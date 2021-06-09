import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#3C54B9',
    },
  },
  typography: {
    h1: {
      fontSize: '48px',
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
      lineHeight: '59px',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '2rem',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '1.8rem',
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '1.2rem',
    },
    subtitle1: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '1rem',
    },
    overline: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 12,
    },
  },
  overrides: {
    MuiButton: {
      root: {},
    },

    MuiInputBase: {},

    MuiInputLabel: {},
  },
});
