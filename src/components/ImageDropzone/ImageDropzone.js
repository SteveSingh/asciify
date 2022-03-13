import { useDropzone } from "react-dropzone";
import {Box, Card, Grid, Typography } from "@mui/material";
import {useCallback, useState, useMemo} from "react";
import ASSCIIConversionCanvas from "../ASSCIIConversionCanvas/ASSCIIConversionCanvas";

const ImageDropzone = () => {

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#A37ABB',
    color: '#eee',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const focusedStyle = {
    borderColor: '#2196f3'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const onDrop = useCallback((files) => {
    let file = files[0], base64URL = '';
    let reader = new FileReader();
    reader.onload = () => {
      // Make a fileInfo Object
      base64URL = reader.result;
      console.log('base64URL', base64URL);
      setCurrentImage(base64URL);
    };
    // Convert the file to base64 text
    reader.readAsDataURL(file);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({accept: 'image/*', onDrop: onDrop, maxFiles: 1});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  const [currentImage, setCurrentImage] = useState(null);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Card>
    <Box sx={{
      backgroundColor: 'secondary.main'
    }}>
      <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }} >
        <Grid item xs={12} margin={2}>
          <section className='dropzone' style={{cursor: 'pointer'}} >
            <div {...getRootProps({className: 'dropzone', style: style})}>
              <input {...getInputProps()} sx={{ border: '1px dashed primary.dark' }} />
              <Typography>Drag 'n' drop image here, or click to select a file</Typography>
            </div>
          </section>
        </Grid>
        <Grid item xs={12} >
          { currentImage && <ASSCIIConversionCanvas image={currentImage} /> }
        </Grid>
      </Grid>
    </Box>
    </Card>
  );
};

export default ImageDropzone;


