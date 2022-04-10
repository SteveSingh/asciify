import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useImage } from "../../contexts/ImageContext";

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
    backgroundColor: 'inherit',
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

  const loadImage = (base64Data) => {
    const img = new Image();
    // Set image source to base64 data
    img.src = base64Data;
    // Wait for image to load (without setting onload explicitly)
    img.decode();
    // Update currentImage state with image
    setCurrentImage(img);
  }

  const onDrop = useCallback((files) => {
    let file = files[0], base64URL = '';
    let reader = new FileReader();
    reader.onload = () => {
      // Make a fileInfo Object
      base64URL = reader.result;
      loadImage(base64URL);
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
  }), [isFocused,isDragAccept,isDragReject]);

  const { setCurrentImage } = useImage();

  return (
    <section className='dropzone' style={{cursor: 'pointer'}} >
      <div {...getRootProps({className: 'dropzone', style: style})}>
        <input {...getInputProps()} />
        <Typography>Drag 'n' drop image here, or click to select a file</Typography>
      </div>
    </section>
  );
};

export default ImageDropzone;


