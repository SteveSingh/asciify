import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import logo from '../assets/logo.gif';
function Navbar(props) {

  return (
    <AppBar position="static"
            // sx={{position: 'relative', zIndex: 2}}
    >
      <Toolbar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '6vh' }}
        >
          <Grid item xs={9}>
            <img src={logo} alt="Loading..." id='main-logo' style={{maxHeight: '10vh'}}/>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='h5' fontFamily='Orbitron' marginBottom={1}>
              ASCIIfy
            </Typography>
          </Grid>

        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
