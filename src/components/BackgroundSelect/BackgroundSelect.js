import { useState } from "react";
import { Fab, Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import { useImage } from "../../contexts/ImageContext";
import WallpaperIcon from '@mui/icons-material/Wallpaper';

const BackgroundSelect = () => {
  const { backgroundFillStyle, setBackgroundFillStyle } = useImage();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = event => {
    const selectedColor = event.target.dataset.color;
    setBackgroundFillStyle( selectedColor ? selectedColor : event.target.value);
  }

  return (
    <div>
      <Tooltip title="Background Color" placement="top">
        <Fab
          sx={{ backgroundColor: '#FFF' }}
          variant="extended"
          size="large"
          data-img-type="base64"
          onClick={handleClick}
        >
          <WallpaperIcon />
        </Fab>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'bg-fill-button',
        }}
      >
        <MenuItem data-color="#000000" onClick={ handleColorChange }>Black</MenuItem>
        <MenuItem data-color="#FFFFFF" onClick={ handleColorChange }>White</MenuItem>
        <MenuItem data-color="avg" onClick={ handleColorChange } >Average Color</MenuItem>
        <Divider />
        <MenuItem>
          <input
            type='color'
            value={ backgroundFillStyle === 'avg' ? '#FFFFFF' : backgroundFillStyle }
            onChange={ handleColorChange }
          /> &nbsp; Custom
        </MenuItem>

      </Menu>
    </div>
  );
};

export default BackgroundSelect;
