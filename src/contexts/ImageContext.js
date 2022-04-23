import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

const ImageProvider = (props) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [sparsity, setSparsity] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [backgroundFillStyle, setBackgroundFillStyle] = useState('#FFFFFF');
  return <ImageContext.Provider
          value={ { currentImage, setCurrentImage,
                    sparsity, setSparsity,
                    isProcessing, setIsProcessing,
                    backgroundFillStyle, setBackgroundFillStyle
          }}
          {...props} />;
};

const useImage = () => {    
  const context = useContext(ImageContext);
  if(!context) throw new Error('useImage called outside of ImageContext Provider!');    
  return context;
};

export { useImage, ImageProvider };
