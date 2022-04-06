import {useImage} from "../../contexts/ImageContext";
import {CircularProgress} from "@mui/material";

const Spinner = ({loadingText}) => {
  const {isProcessing} = useImage();
  return (
    <>
      {isProcessing && <CircularProgress color='secondary' />} { loadingText }
    </>
  );
}

export default Spinner;