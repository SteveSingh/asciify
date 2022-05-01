# ASCIIfy!
A React app integrating of one of my favourite pixel manipulation effects: transforming images into ASCII art 😄
[Try it yourself!](https://stevesingh.github.io/asciify/)

## Usage
1. Install the project dependencies with `yarn install` or `npm install`
2. `yarn start` or `npm start` to get the server started (default port: 3500)
3. Once in the app, you can choose to either drag 'n' drop or manually select your image file. Use the slider to 
adjust the ASCII character sparsity and watch the magic happen! 
4. You can then freely switch images, download the currently modified image as a PNG file, or copy the base64 data URL 
   of the image to your clipboard.
5. At any point, you can also choose a custom background colour from four options: white (default), black, average color 
   (which calculates the image's average color overall), or your own color of choice from the color picker

####Notes on Performance Bottlenecks
- The lower the sparsity, the more CPU-intensive the image transformation will be. 
  This is mainly an issue for the 2px or 4px character sparsity settings. You can simply click a higher sparsity setting 
  on the slider (without sliding) to avoid this
- Changing the background fill color will result in a re-processing/rendering of the image, so be mindful of rapid color 
  changes (such as when clicking & dragging inside the top section of the color picker). As usual, this is more of an
  issue with lower character sparsity settings
  

## Credits
I've been the single contributor on this project from start to finish (so far!) and it has not been forked from any 
existing repos. HOWEVER:

- I'd like to give a big thank you to Frank over at [Frank's laboratory](https://www.youtube.com/c/Frankslaboratory) 
on YouTube for the inspiration. His channel explores many pixel manipulation effects and has cool tutorials; check it out!
- [Canva's Free Logo Maker](https://www.canva.com/create/logos/) was used to create the animated logo. Beautiful tool 
with many great options
- Last but certainly not least, thank you to all the awesome open-source contributors out there who are responsible in 
any way for the dependencies which made this app possible ❤️
