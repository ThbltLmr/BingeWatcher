import { WatchedShow } from "../types";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import WatchedShowCard from "./WatchedShowCard";

export default function Carrousel({watchedShows}: {watchedShows: WatchedShow[]}){
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(Math.min(watchedShows.length, 8))
  const [translateX, setTranslateX] = useState(0)

  const previousDisabled = (startIndex === 0)
  const nextDisabled = (endIndex === watchedShows.length)

  const goToPrevious = () => {
    const cardWidth = document.querySelector(".width").firstChild.scrollWidth
    setStartIndex(startIndex - 1)
    setEndIndex(endIndex - 1)
    setTranslateX(translateX + cardWidth)
  }

  const goToNext = () => {
    const cardWidth = document.querySelector(".width").firstChild.scrollWidth
    setStartIndex(startIndex + 1)
    setEndIndex(endIndex + 1)
    setTranslateX(translateX - cardWidth)
  }

  return(
    <div className="m-0 p-0">
      <div className="flex relative w-full justify-between align-center">
        <div className="flex w-1/12 align-center">
          <IconButton aria-label="previous" size="large" onClick={goToPrevious} disabled={previousDisabled}>
            <ChevronLeftIcon sx={{fontSize: 40}} />
          </IconButton>
        </div>
          <div className="flex justify-start overflow-hidden w-10/12">
            {watchedShows.map((watchedShow) => {
              return(
                <div className="width m-2 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${translateX}px)` }}>
                  <WatchedShowCard key={watchedShow.show.tmdbId} watchedShow={watchedShow} />
                </div>
              )
            })}
          </div>
        <div className="flex w-1/12 align-center">
          <IconButton aria-label="previous" size="large" onClick={goToNext} disabled={nextDisabled}>
            <ChevronRightIcon sx={{fontSize: 40}} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
