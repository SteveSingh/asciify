import {useRef, useEffect } from "react";
import {useImage} from "../../contexts/ImageContext";
import ActionButtons from "../ActionButtons/ActionButtons";

const ASSCIIConversionCanvas = () => {
  const canvasRef = useRef(null),
        ctxRef = useRef(null);
  const { currentImage, sparsity, isProcessing, setIsProcessing, backgroundFillStyle } = useImage();
  const imageRef = useRef(currentImage);

  const convertToSymbol = avgColor => {
    if (avgColor > 250) return '@';
    else if (avgColor > 240) return '+';
    else if (avgColor > 220) return '#';
    else if (avgColor > 200) return '&';
    else if (avgColor > 180) return '%';
    else if (avgColor > 160) return '_';
    else if (avgColor > 120) return ':';
    else if (avgColor > 100) return '$';
    else if (avgColor > 80) return '/';
    else if (avgColor > 60) return '-';
    else if (avgColor > 40) return '·';
    else if (avgColor > 15) return 'ı';
    else if (avgColor > 10) return '°';
    else if (avgColor > 5) return '.';
    else return '·'
  }

  const calculateAvgColor = colorArray => (
    parseInt((colorArray.reduce((accumulator, a) => accumulator + a, 0)) / colorArray.length)
  );

  const convertToASCII = () => {
    // Store width and height values for readability (frequently used)
    const canvas = canvasRef.current,
      ctx = ctxRef.current,
      image = imageRef.current,
      width = canvas.width,
      height = canvas.height,
      imageCellArray = [],
      reds = [],
      greens = [],
      blues = [];
    let avgRed, avgGreen, avgBlue;

    ctx.drawImage(image, 0, 0, width, height);
    const pixels = ctx.getImageData(0,0, width, height);

    if(sparsity > 0) {
      // Set font size based on sparsity setting
      ctx.font = `${sparsity * (sparsity > 12 ? 1.1 : 1.4)}px Roboto`;
      // Split image into (squared) cells based on sparsity value. Iterate over the image in (sparsity x sparsity) sized chunks
      for (let y = 0; y < pixels.height; y += sparsity) {
        for (let x = 0; x < pixels.width; x += sparsity) {
          // Get current X and Y positions (offset by cell array size == sparsity value)
          const posX = x * 4;
          const posY = y * 4;
          // Get current linear position in pixel array; calculated by (Y position x width + X position offset)
          const pos = posY * pixels.width + posX;
          // Consider a non-transparent value to be alpha = 128. This is the current
          if (pixels.data[pos + 3] > 128) {
            // Get R,G,B values and calculate total colour. Then get the symbol based on avg. colour
            const red = pixels.data[pos],
              green = pixels.data[pos + 1],
              blue = pixels.data[pos + 2],
              avgColor = (red + green + blue) / 3,
              symbol = convertToSymbol(avgColor);
            // if (red + green + blue > 50) {
            // Push calculated values to image cell array
            imageCellArray.push({x, y, symbol, color: `rgb(${red},${green},${blue})`});
            reds.push(red);
            greens.push(green);
            blues.push(blue);
            // }
          }
        }
      }
      // Calculate average colour of image and set as background fill
      avgRed = calculateAvgColor(reds);
      avgGreen = calculateAvgColor(greens);
      avgBlue = calculateAvgColor(blues);
      console.log(`Average red: ${avgRed}\nAverage green: ${avgGreen}\nAverage blue: ${avgBlue}`);
      console.log(`rgba(${avgRed},${parseInt(avgGreen/2.0)},${avgBlue},0.5)`);
      // Clear canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      // Set background based on backgroundFillStyle
      ctx.fillStyle = backgroundFillStyle === 'avg' ? `rgba(${avgRed},${avgGreen},${avgBlue},0.6)` : backgroundFillStyle;
      ctx.fillRect(0, 0, width, height);
      // Iterate through newly created image cells and paint their coloured symbols onto the canvas
      imageCellArray.forEach(cellData => {
        ctx.fillStyle = '#FFF';
        ctx.fillText(cellData.symbol, cellData.x - 0.5, cellData.y + 0.5);
        ctx.fillStyle = cellData.color;
        ctx.fillText(cellData.symbol, cellData.x, cellData.y);
      });
    }
    setIsProcessing(false);
  }

  const paintCanvas = () => {
    // Don't do anything unless the image/canvas are ready
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

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
    ctxRef.current = canvasRef.current.getContext('2d');
    convertToASCII();
  }

  // Paint canvas on initial load
  useEffect( () => {
    paintCanvas();
  }, []);

  // Re-paint every time sparsity changes
  useEffect(() => {
    if (!(imageRef.current.complete && canvasRef.current) && isProcessing){
      return;
    }
    convertToASCII();
  }, [sparsity, backgroundFillStyle, isProcessing]);

  useEffect(() =>{
    imageRef.current = currentImage;
    paintCanvas();
  }, [currentImage]);

  return (
    <center>
      { <canvas ref={canvasRef} /> }
      { imageRef.current.complete && <ActionButtons canvas={canvasRef} /> }
    </center>
  );
};

export default ASSCIIConversionCanvas;
