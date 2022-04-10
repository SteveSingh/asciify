# ASCIIfy!
A React app integrating of one of my favourite pixel manipulation effects: transforming images into ASCII art 😄

## Usage
Install the project dependencies with `yarn install` or `npm install` and then `yarn start` or `npm start` to get 
started. Once in the app, you can choose to either drag 'n' drop or manually select your image file. Use the slider to 
adjust the ASCII character sparsity and watch the magic happen! You can then freely switch images, download the 
currently modified image as a PNG file, or copy the base64 data URL of the image to your clipboard.

**Note: The lower the sparsity, the more CPU-intensive the image transformation will be. This is mainly an issue for
the 2px or 4px settings. You can simply click a higher sparsity setting on the slider (without sliding) to avoid this**

## Credits
I've been the single contributor on this project from start to finish (so far!) and it has not been forked from any 
existing repos. HOWEVER:

- I'd like to give a big thank you to Frank over at [Frank's laboratory](https://www.youtube.com/c/Frankslaboratory) 
on YouTube for the inspiration. His channel explores many pixel manipulation effects and has cool tutorials; check it out!
- [Canva's Free Logo Maker](https://www.canva.com/create/logos/) was used to create the animated logo. Beautiful tool 
with many great options
- Last but certainly not least, thank you to all the awesome open-source contributors out there who are responsible in 
any way for the dependencies which made this app possible ❤️
