import { Button, FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Show } from "../types";
import ShowCard from "./ShowCard";
import Slider from '@mui/material/Slider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";

export default function CenterPopUp({show, setShowPopUp}: {show: Show, setShowPopUp: Function}){

  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);

  function valuetext(value: number) {
    if (value === 1) return `${value} season`;
    if (value === show.numberOfSeasons) return `All seasons`;
    return `${value} seasons`;
  }

  const handleStartedShow = () => {
    setAddButtonOpen(true);
    setSliderOpen(true);
  }
  const handleNotStartedShow = () => {
    setAddButtonOpen(true);
    setSliderOpen(false);
  }

  return(
    <div className="absolute left-0 h-screen w-screen bg-black bg-opacity-70">
      <div className="absolute rounded mt-8 w-fit h-fit inset-x-1/2 inset-y-1/3 -translate-x-1/2 -translate-y-1/2 p-3 bg-slate-200">
        <div className="absolute top-0 right-0">
        <IconButton aria-label="delete" onClick={() => {setShowPopUp(false)}}>
          <CloseIcon />
        </IconButton>
        </div>
        <div className="flex flex-col m-6 w-96 h-96">
          <ShowCard show={show} />
        </div>
        <div className="mt-4 mb-4">
          <h2 className="text-lg text-center">Have you started this show?</h2>
        </div>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          >
         <div className="mx-auto">
            <FormControlLabel value="yes"  onClick={handleStartedShow} control={<Radio />} label="Yes" />
            <FormControlLabel value="no" onClick={handleNotStartedShow} control={<Radio />} label="No" />
         </div>
        </RadioGroup>
       {sliderOpen &&
       <div>
       <div className="mt-4 mb-12">
          <h2 className="text-lg text-center">How many seasons have you watched?</h2>
        </div>
        <div className="flex align-middle flex-col">
          <Slider
            aria-label="Seasons watched"
            getAriaValueText={valuetext}
            defaultValue={1}
            valueLabelDisplay="on"
            step={1}
            marks={true}
            min={1}
            max={show.numberOfSeasons}
            sx={{width: '80%', margin: 'auto'}}
            valueLabelFormat={(value) => valuetext(value)}
          />
        </div>
        </div>
        }
        {addButtonOpen &&
        <div className="flex flex-col align-middle">
        <Button variant="contained" endIcon={<AddCircleOutlineIcon />} sx={{width: '80%', margin: 'auto'}}>
            Add this show
        </Button>
        </div>}
      </div>
    </div>
  )
}
