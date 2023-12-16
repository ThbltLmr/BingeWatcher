import { WatchedShow } from "../types";

export default function WatchedShowCard({watchedShow}: {watchedShow: WatchedShow}){

  const show = watchedShow.show;

  const showFinished = (watchedShow.watchedSeasons === show.numberOfSeasons);

  return(
    <div className="w-80 p-2 flex flex-col justify-center align-middle relative">
      <img className="rounded" key={show.tmdbId} src={show.posterUrl.value}></img>
      <div className="absolute bottom-0 w-full h-1/5 bg-white opacity-90 flex flex-col justify-center align-middle">
        <h1 className="mx-auto text-center font-semibold text-xl">{show.title}</h1>
        {!showFinished &&
        <h2 className="mx-auto text-center text-lg">{watchedShow.watchedSeasons} / {show.numberOfSeasons} seasons watched</h2>}
        {showFinished &&
        <h2 className="mx-auto text-center text-lg">All seasons watched</h2>}
      </div>
    </div>
  )
}
