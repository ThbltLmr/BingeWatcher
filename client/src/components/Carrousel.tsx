import { WatchedShow } from "../types";
import { useEffect, useRef, useState } from "react";
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import WatchedShowCard from "./WatchedShowCard";

export default function Carrousel({watchedShows}: {watchedShows: WatchedShow[]}){
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(Math.min(watchedShows.length -1, 6))
  const [translateX, setTranslateX] = useState(0)
  const [carrouselShows, setCarrouselShows] = useState(watchedShows)
  const cardRef = useRef(null)

  useEffect(() => {
    setEndIndex(Math.min(watchedShows.length, 6) - 1);
    if (watchedShows.length > 6) { setCarrouselShows(watchedShows)}
    if (watchedShows.length === 6) { setCarrouselShows((prevShows) => [...prevShows, ...watchedShows]); }
  }, [watchedShows]);

  const previousDisabled = (startIndex === 0)

  const goToPrevious = () => {
    const cardWidth = cardRef.current?.firstChild.scrollWidth || 0;
    setStartIndex(startIndex - 1)
    setEndIndex(endIndex - 1)
    setTranslateX(translateX + cardWidth)
  }

  const goToNext = () => {
    if (endIndex >= watchedShows.length - 2) {
      setCarrouselShows((prevShows) => [...prevShows, ...watchedShows]);
    }
    const cardWidth = cardRef.current?.firstChild.scrollWidth || 0;
    setStartIndex(startIndex + 1)
    setEndIndex(endIndex + 1)
    setTranslateX(translateX - cardWidth)
  }

  return(
    <div className="m-0 p-0 w-full">
      <div className="flex relative w-full justify-between align-center">
        <div className="flex w-1/12">
          <IconButton aria-label="previous" size="large" onClick={goToPrevious} disabled={previousDisabled} sx={{flexGrow: 1}}>
            <ChevronLeftIcon sx={{fontSize: 40}} />
          </IconButton>
        </div>
          <div className="flex justify-start overflow-hidden w-10/12" ref={cardRef}>
            {carrouselShows.map((watchedShow) => {
              return(
                <div key={watchedShow.show.tmdbId} className="w-1/6 p-2 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${translateX}px)` }}>
                  <WatchedShowCard watchedShow={watchedShow} />
                </div>
              )
            })}
          </div>
        <div className="flex w-1/12">
          <IconButton aria-label="previous" size="large" onClick={goToNext} sx={{flexGrow: 1}}>
            <ChevronRightIcon sx={{fontSize: 40}} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
