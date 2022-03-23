const ASCIIArt = (canvas, ctx, image, sparsity, effectType = 'grayscale') => {
    // Store width and height values for readability (frequently used)
    let width = image.width,
        height = image.width;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    // Get pixel data of image
    console.log(`Rendering with sparsity set to: ${sparsity}`);
    const pixels = ctx.getImageData(0,0, 728, 410);

    // Create mapped image
    let mappedImage = [];
    // for(let y = 0; y < canvas.height; y++){
    //   let row = [];
    //   for(let x = 0; x < canvas.width; x++){
    //     // Grab RGB values by calculating exact position
    //     const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
    //     const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)]
    //     const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)]
    //     const brightness = calculateRelativeBrightness(red, green, blue);
    //     // Push a single-cell array containing the relative brightness to each row
    //     row.push([brightness]);
    //   }
    //   // Push each row to make up the mapped image
    //   mappedImage.push(row);
    // }
    //
    // console.log(mappedImage);
    //
    // //-- Initialize particles
    // let particlesArray = [];
    // for(let i = 0; i < numberOfParticles; i ++){
    //   particlesArray.push(new Particle(canvas, ctx))
    // }
    //
    // //-- Animation loop
    // const animate = () => {
    //   // ctx.drawImage(image, 0, 0, image.width, image.height);
    //   ctx.globalAlpha = 0.05;
    //   ctx.fillStyle = 'rgb(0,0,0)';
    //   ctx.fillRect(0,0, canvas.width, canvas.height);
    //   ctx.globalAlpha = 0.05;
    //   requestAnimationFrame(animate);
    //   particlesArray.forEach((particle, i) => {
    //     particle.update(mappedImage);
    //     particle.draw();
    //   })
    // }
    // // Run animation
    // animate();

}

export default ASCIIArt;