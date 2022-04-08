import {useImage} from "../../contexts/ImageContext";
import {Slider, Typography, Card} from "@mui/material";

const SparsitySlider = () => {
  const { sparsity, setSparsity, setIsProcessing } = useImage();
  const marks = [
    { value: 0, label: '0px'},
    { value: 2, label: '2px'},
    { value: 4, label: '4px'},
    { value: 6, label: '6px'},
    { value: 8, label: '8px'},
    { value: 10, label: '10px'},
    { value: 12, label: '12px'},
    { value: 14, label: '14px'},
    { value: 16, label: '16px'},
    { value: 18, label: '18px'},
    { value: 20, label: '20px'},
  ];
  // Custom formatting for value label
  const labelFormat = value => (value === 0 ? value : `${value} px`);

  return (
      <Card sx={{
        padding: 5,
        paddingTop: 2
        // backgroundColor: 'secondary.dark',
        // color: 'secondary.contrastText'
      }}>
        <Typography variant='h6' textAlign='center' margin={2} >
          Set Character Sparsity
        </Typography>
        <Slider
          value={sparsity}
          color='secondary'
          min={0}
          max={20}
          step={2}
          marks={marks}
          // valueLabelDisplay="auto"
          // valueLabelFormat= {labelFormat}
          onChange={ e => {
            e.preventDefault();
            const newVal = parseInt(e.target.value);
            if(newVal !== 0 && newVal !== sparsity) setIsProcessing(true);
            if(newVal !== sparsity) setSparsity(newVal);
          }}/>
      </Card>
  );
};

export default SparsitySlider;
