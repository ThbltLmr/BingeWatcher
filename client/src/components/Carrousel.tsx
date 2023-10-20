import { Show } from "../types";
import { useState } from "react";

export default function Carrousel({shows}: {shows: Show[]}){
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(shows.length)

  return(
    <div>
      <div className="flex">
        <a>
          
        </a>
        {shows.slice(startIndex, endIndex).map((show) => {
          return <img className="m-2 rounded" key={show.TMDBid} src={show.posterURL}></img>;
        })}
      </div>
    </div>
  )
}
