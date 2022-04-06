import {createTheme} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#051014',
      light: '#2e2f2f',
      dark: '#030B0E',
    },
    secondary: {
      main: '#5d747f',
      contrastText: '#ffffff',
      light: '#718d9a',
      dark: '#38454C',
    },
  },
})

export default theme;