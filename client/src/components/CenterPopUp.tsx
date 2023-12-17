import { Button } from "@mui/material";
import { Show } from "../types";
import ShowCard from "./ShowCard";
import Slider from '@mui/material/Slider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function CenterPopUp({show}: {show: Show}){

  function valuetext(value: number) {
    if (value === 1) return `${value} season`;
    if (value === show.numberOfSeasons) return `All seasons`;
    return `${value} seasons`;
  }

  return(
    <div className="absolute h-screen w-screen bg-black bg-opacity-70">
      <div className="absolute rounded w-fit h-fit inset-x-1/2 inset-y-1/3 -translate-x-1/2 -translate-y-1/2 p-3 bg-slate-200">
        <div className="flex flex-col m-2 w-96">
          <ShowCard show={show} />
        </div>
        <div className="m-4">
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
          <Button variant="contained" endIcon={<AddCircleOutlineIcon />} sx={{width: '80%', margin: 'auto'}}>
              Add this show
          </Button>
        </div>
      </div>
    </div>
  )
}
