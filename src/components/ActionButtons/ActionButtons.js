import { useState } from "react";
import { Fab, Card, Grid, Tooltip, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import GetAppIcon from '@mui/icons-material/GetApp';
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio';
import BackgroundSelect from "../BackgroundSelect/BackgroundSelect";

const ActionButtons = ({canvas}) => {
  const [copyTooltipText, setCopyTooltipText] = useState('Copy Base64 Image Data');
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const handleClick = event => {
    event.preventDefault();
    const imageType = event.currentTarget.dataset.imgType;
    let imageData = canvas.current.toDataURL();
    if (imageType === 'base64'){
      // Copy Base64 URL to clipboard and notify via tooltip that the Base64 data has been copied
      navigator.clipboard.writeText(imageData)
        .then(() => setCopyTooltipText('Copied!'));
      // Reset tooltip message
      setTimeout(() => setCopyTooltipText('Copy Base64 Image Data'), 500);
    } else {
      // Download image
      const tempLink = document.createElement('a');
      document.body.appendChild(tempLink);
      tempLink.href = imageData;
      tempLink.download = `ASCIIfy-img.png`;
      tempLink.click();
      document.body.removeChild(tempLink);
      setSnackbarVisibility(true);
    }
  }
  return (
    <Card className='action-buttons' variant="outlined" sx={{ padding: 2, marginTop: 2, backgroundColor: '#eee', width: '75%' }}>
      <Snackbar
        open={snackbarVisibility}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') return;
          setSnackbarVisibility(false);
        }
      }>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Download Complete!
        </MuiAlert>
      </Snackbar>
      <Grid container gap={2} justifyContent="center">
        <Grid item xs={3}>
          <Tooltip title="Download Image" placement="left">
            <Fab
              color="primary"
              variant="extended"
              size="large"
              data-img-type="jpeg"
              onClick={handleClick}
            >
              <GetAppIcon />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <BackgroundSelect />
        </Grid>
        <Grid item xs={3}>
          <Tooltip title={copyTooltipText} placement="right">
            <Fab
              color="secondary"
              variant="extended"
              size="large"
              data-img-type="base64"
              onClick={handleClick}
            >
              <ImageAspectRatioIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ActionButtons;
