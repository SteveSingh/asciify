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
      main: '#A37ABB',
      contrastText: '#ffffff',
      light: '#B594C8',
      dark: '#725582',
    },
  },
})

export default theme;