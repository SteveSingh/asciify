import {useRef, useState, useEffect } from "react";
import { Grid, Card, Slider, Typography } from "@mui/material";
import ASCIIArt from "../../utils/ASCIIArt";
import {useImage} from "../../contexts/ImageContext";

const ASSCIIConversionCanvas = () => {
  const canvasRef = useRef(null),
        ctxRef = useRef(null);
  const {currentImage, sparsity, setSparsity } = useImage();
  const imageRef = useRef(currentImage);
  const convertToASCII = ASCIIArt;

  const paintCanvas = () => {
    if (!(imageRef.current.complete && canvasRef.current)){
      // console.log('useEffect for sparsity change not ran');
      return
    }
    canvasRef.current.width = imageRef.current.width;
    canvasRef.current.height = imageRef.current.height;
    canvasRef.current.style.width = `${imageRef.current.width}px`;
    canvasRef.current.style.height = `${imageRef.current.height}px`;
    ctxRef.current = canvasRef.current.getContext('2d');
    convertToASCII(canvasRef.current, ctxRef.current, imageRef.current, sparsity);
  }

  useEffect( () => {
    paintCanvas();
    console.log("Image loaded!")
    // Cleanup function
    return () => {
      console.log('Cleanup function ran (for load image)')
    };
  }, []);

  // Runs every time sparsity changes
  useEffect(() => {
    if (!(imageRef.current.complete && canvasRef.current)){
      // console.log('useEffect for sparsity change not ran');
      return
    }
    convertToASCII(canvasRef.current, ctxRef.current, imageRef.current, sparsity);
  }, [sparsity]);

  useEffect(() =>{
    imageRef.current = currentImage;
    paintCanvas();
    // console.log('useEffect for currentImage change ran');
  }, [currentImage]);

  return (
    <Card sx={{ padding: 5}}>
      <Grid
        container
        direction="column"
        alignItems="center">
        <Grid item id="load-state-container">
        </Grid>
        <Grid item xs={12}>
          { <canvas ref={canvasRef} /> }
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' textAlign='center' margin={2}>
            Set Character Sparsity
          </Typography>
          <Slider
            value={sparsity}
            min={0}
            max={20}
            step={2}
            valueLabelDisplay="auto"
            valueLabelFormat={ value => value === 0 ? value : `${value} px` }
            onChange={ e => setSparsity(e.target.value)}/>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ASSCIIConversionCanvas;
