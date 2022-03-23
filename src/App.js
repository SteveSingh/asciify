import "./App.css";
import TourCard from "./components/TourCard";
import { Container, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar";
import ImageDropzone from "./components/ImageDropzone/ImageDropzone";
import { ImageProvider } from "./contexts/ImageContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container maxWidth="lg">
				<ImageProvider>
					<Grid container spacing={2} marginTop={1} height="100vh">
						<Grid item xs={12}>
							<ImageDropzone />
						</Grid>
					</Grid>
				</ImageProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
