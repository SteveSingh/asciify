import "./App.css";
import { Container, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar";
import ImageDropzone from "./components/ImageDropzone/ImageDropzone";
import { useImage } from "./contexts/ImageContext";
import ASSCIIConversionCanvas from "./components/ASSCIIConversionCanvas/ASSCIIConversionCanvas";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";

const App = () => {
	const { currentImage } = useImage();
  return (
    <ThemeProvider theme={theme}>
			<ParticleBackground />
      <Navbar />
			<Container maxWidth="lg" sx={{position: 'relative', minHeight: "200vh", zIndex: 1}}>
				<Grid
					container
					spacing={1}
					alignItems="center"
					justifyContent="center"
					style={{ padding: 20 }}>
					<Grid item xs={10} >
						<ImageDropzone />
					</Grid>
					<Grid item xs={12} >
						{ currentImage && <ASSCIIConversionCanvas/> }
					</Grid>
				</Grid>
			</Container>
    </ThemeProvider>
  );
}

export default App;
