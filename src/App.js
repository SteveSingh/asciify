import './App.css';
import TourCard from "./components/TourCard";
import { Container, Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme';
import Navbar from "./components/Navbar";
import ImageDropzone from "./components/ImageDropzone/ImageDropzone";

function App() {
  return (
    <ThemeProvider theme={theme} >
      <Navbar />
      <Container maxWidth='lg'>
        <Grid container spacing={2} marginTop={1}>
          {/*<Grid item xs={12} >*/}
          {/*  <Navbar/>*/}
          {/*</Grid>*/}
          <Grid item xs={12}>
            <ImageDropzone />
          </Grid>
          <Grid item xs={6} >
            BUTTONS HERE
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
