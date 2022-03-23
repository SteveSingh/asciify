class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
  }

  update(mappedImage) {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.speed = mappedImage[this.position1][this.position2][0];
    let movement = (2.5 - this.speed) + this.velocity;
    this.y += movement;
    if(this.y >= this.canvas.height){
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw(){
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,1.0)';
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Eyes perceive red, green, and blue brightness levels differently. Calculate them based on their relative magnitudes
const calculateRelativeBrightness = (r, g, b) => (
  Math.sqrt((r * r * 0.299) + (g * g * 0.587) + (b * b * 0.114))/100
)

const applyEffect = (canvas, ctx, image, numberOfParticles = 5000, effectType = 'grayscale') => {
  console.log('ParticleRain.applyEffect called!');
  // Get pixel data of image
  const pixels = ctx.getImageData(0,0, canvas.width, canvas.height);
  // Create mapped image
  let mappedImage = [];
  for(let y = 0; y < canvas.height; y++){
    let row = [];
    for(let x = 0; x < canvas.width; x++){
      // Grab RGB values by calculating exact position
      const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
      const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)]
      const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)]
      const brightness = calculateRelativeBrightness(red, green, blue);
      // Push a single-cell array containing the relative brightness to each row
      row.push([brightness]);
    }
    // Push each row to make up the mapped image
    mappedImage.push(row);
  }

  console.log(mappedImage);

  //-- Initialize particles
  let particlesArray = [];
  for(let i = 0; i < numberOfParticles; i ++){
    particlesArray.push(new Particle(canvas, ctx))
  }

  //-- Animation loop
  const animate = () => {
    // ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.05;
    requestAnimationFrame(animate);
    particlesArray.forEach((particle, i) => {
      particle.update(mappedImage);
      particle.draw();
    })
  }
  // Run animation
  animate();
}

const ParticleRain = {
  applyEffect
}

export default ParticleRain;