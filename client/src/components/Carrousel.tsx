import { Show } from "../types";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Carrousel({shows}: {shows: Show[]}){
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(shows.length)

  return(
    <div className="m-0 p-0">
      <div className="flex relative w-full justify-between">
        <IconButton aria-label="previous" size="large">
          <ChevronLeftIcon sx={{fontSize: 40}} />
        </IconButton>
        {shows.slice(startIndex, endIndex).map((show) => {
          return <img className="m-2 rounded" key={show.TMDBid} src={show.posterURL}></img>;
        })}
        <IconButton aria-label="previous" size="large">
          <ChevronRightIcon sx={{fontSize: 40}} />
        </IconButton>
      </div>
    </div>
  )
}
