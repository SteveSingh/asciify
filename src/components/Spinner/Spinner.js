import {useImage} from "../../contexts/ImageContext";
import {CircularProgress} from "@mui/material";

const Spinner = ({loadingText}) => {
  const {isProcessing} = useImage();
  return (
    <>
      {isProcessing && <CircularProgress disableShrink color='secondary' />}
      <br/>
      { loadingText }
    </>
  );
}

export default Spinner;