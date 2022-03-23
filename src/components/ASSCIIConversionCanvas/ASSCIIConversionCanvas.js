import {useRef, useState, useEffect } from "react";
import {Card, Slider, Typography } from "@mui/material";
import ASCIIArt from "../../utils/ASCIIArt";
import {useImage} from "../../contexts/ImageContext";

const ASSCIIConversionCanvas = () => {
  const canvasRef = useRef(null),
        ctxRef = useRef(null);
  const {currentImage, sparsity, setSparsity } = useImage();
  const imageRef = useRef(currentImage);
  const convertToASCII = ASCIIArt;

  const paintCanvas = () => {
    canvasRef.current.width = imageRef.current.width;
    canvasRef.current.height = imageRef.current.height;
    canvasRef.current.style.width = `${imageRef.current.width}px`;
    canvasRef.current.style.height = `${imageRef.current.height}px`;
    ctxRef.current = canvasRef.current.getContext('2d');
    convertToASCII(canvasRef.current, ctxRef.current, imageRef.current, sparsity, '');
  }

  useEffect( () => {
    paintCanvas();
    console.log("Image loaded!")
    // Cleanup function
    return () => {
      console.log('Cleanup function ran (for load image)')
    };
  }, []);


  // Runs every time image changes
  useEffect(() => {
    if (!(imageRef.current.complete && canvasRef.current)){
      // console.log('useEffect for sparsity change not ran');
      return
    }
    convertToASCII(canvasRef.current, ctxRef.current, imageRef.current, sparsity, '');
    // const scannedImage = ctxRef.current.getImageData(0,0, canvasRef.current.width, canvasRef.current.height);
    return () => {
    };
  }, [sparsity]);

  useEffect(() =>{
    imageRef.current = currentImage;
    paintCanvas();
    // console.log('useEffect for currentImage change ran');
  }, [currentImage]);



  return (
    <Card sx={{ padding: 5, border: '2px dashed #fff', maxWidth: '90vw' }}>
      <canvas ref={canvasRef} />
      <div>
        <Typography variant='h5' textAlign='center' margin={2}>
          Set Sparsity
        </Typography>
        <Slider value={sparsity} valueLabelDisplay="auto" onChange={ e => setSparsity(e.target.value)}/>
      </div>
    </Card>
  );
};

export default ASSCIIConversionCanvas;
