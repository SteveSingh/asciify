import {useImage} from "../../contexts/ImageContext";
import {CircularProgress} from "@mui/material";

function Spinner(props) {
  const {isProcessing} = useImage();
  console.log("SPINNER LOADED. PROCESSING: ", isProcessing)
  return (
    <>
      {isProcessing && <CircularProgress />}
    </>
  );
}

export default Spinner;