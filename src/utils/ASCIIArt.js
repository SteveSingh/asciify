const ASCIIArt = (canvas, ctx, image, sparsity, setProcessingState) => {
  // console.log(`Rendering with sparsity set to: ${sparsity}`);
  // Store width and height values for readability (frequently used)
  const width = canvas.width,
        height = canvas.height,
        imageCellArray = [];
  ctx.drawImage(image, 0, 0, width, height);
  const pixels = ctx.getImageData(0,0, width, height);
  // Convert avg colour value to (arbitrarily decided) symbol
  const convertToSymbol = (avgColor) => {
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
    else if (avgColor > 15) return '0';
    else if (avgColor > 10) return '▒';
    else if (avgColor > 5) return '■';
    else return ''
  }

  if(sparsity > 0) {
    // Set font size based on sparsity setting
    ctx.font = `${sparsity * 1.2}px Roboto`;
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
          if (red + green + blue > 100) {
            // Push calculated values to image cell array
            imageCellArray.push({x, y, symbol, color: `rgb(${red},${green},${blue})`});
          }
        }
      }
    }
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    // Iterate through newly created image cells and paint their coloured symbols onto the canvas
    imageCellArray.forEach(cellData => {
      ctx.fillStyle = 'white';
      ctx.fillText(cellData.symbol, cellData.x + 0.5, cellData.y + 0.5);
      ctx.fillStyle = cellData.color;
      ctx.fillText(cellData.symbol, cellData.x, cellData.y);
    });
  }
}

export default ASCIIArt;