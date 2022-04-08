import {useRef, useEffect } from "react";
import ASCIIArt from "../../utils/ASCIIArt";
import {useImage} from "../../contexts/ImageContext";
import ActionButtons from "../ActionButtons/ActionButtons";

const ASSCIIConversionCanvas = () => {
  const canvasRef = useRef(null),
        ctxRef = useRef(null);
  const {currentImage, sparsity, isProcessing, setIsProcessing } = useImage();
  const imageRef = useRef(currentImage);
  const convertToASCII = ASCIIArt;

  const paintCanvas = async () => {
    if (!(imageRef.current.complete && canvasRef.current)){
      return
    }

    let img = imageRef.current,
        nw = img.naturalWidth,
        nh = img.naturalHeight,
        aspect = nw/nh,
        maxWidth = 1024,
        width = (nw > maxWidth ? maxWidth : nw),
        height = width / aspect;

    canvasRef.current.width = width; //imageRef.current.width;
    canvasRef.current.height = height; //imageRef.current.height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
    ctxRef.current = canvasRef.current.getContext('2d');
    convertToASCII(canvasRef.current, ctxRef.current, imageRef.current, sparsity);
  }

  // Paint canvas on initial load
  useEffect( () => {
    paintCanvas();
  }, []);

  // Re-paint every time sparsity changes
  useEffect(() => {
    if (!(imageRef.current.complete && canvasRef.current) && isProcessing){
      // console.log('useEffect for sparsity change not ran');
      return;
    }
    convertToASCII(canvasRef.current, ctxRef.current, imageRef.current, sparsity);
    setIsProcessing(false);
  }, [sparsity, isProcessing]);

  useEffect(() =>{
    imageRef.current = currentImage;
    paintCanvas();
    // console.log('useEffect for currentImage change ran');
  }, [currentImage]);

  return (
    <center>
      { <canvas ref={canvasRef} /> }
      { imageRef.current.complete && <ActionButtons canvas={canvasRef} /> }
    </center>
  );
};

export default ASSCIIConversionCanvas;
