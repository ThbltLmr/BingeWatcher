import { Show } from "../types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Carrousel({shows}: {shows: Show[]}){
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(shows.length)

  return(
    <div>
      <div className="flex relative w-fit">
        <div className="absolute left-0 text-xxl h-full w-32">
          <a><FontAwesomeIcon icon={faChevronLeft} /></a>
        </div>
        {shows.slice(startIndex, endIndex).map((show) => {
          return <img className="m-2 rounded" key={show.TMDBid} src={show.posterURL}></img>;
        })}
        <div className="absolute right-0 text-xxl h-full w-32">
          <a><FontAwesomeIcon icon={faChevronRight} /></a>
        </div>
      </div>
    </div>
  )
}
