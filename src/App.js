import "./App.css";
import { Container, Grid, Card } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar";
import ImageDropzone from "./components/ImageDropzone/ImageDropzone";
import { useImage } from "./contexts/ImageContext";
import ASSCIIConversionCanvas from "./components/ASSCIIConversionCanvas/ASSCIIConversionCanvas";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import SparsitySlider from "./components/SparsitySlider/SparsitySlider";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
	const { currentImage, isProcessing } = useImage();
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
						{ currentImage && <SparsitySlider /> }
					</Grid>
					<Grid item xs={12} >
						{currentImage &&
							<Card sx={{ padding: 3 }}>
								<div>
									<ASSCIIConversionCanvas/>
									<center>
										{isProcessing && <Spinner loadingText='Processing...' />}
									</center>
								</div>
							</Card>}
					</Grid>
				</Grid>
			</Container>
    </ThemeProvider>
  );
}

export default App;
