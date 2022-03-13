import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.gif';
function Navbar(props) {

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <img src={logo} alt="Loading..." id='main-logo' style={{maxWidth: '10%'}}/>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
