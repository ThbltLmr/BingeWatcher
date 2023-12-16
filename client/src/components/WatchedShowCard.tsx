import { WatchedShow } from "../types";

export default function WatchedShowCard({watchedShow}: {watchedShow: WatchedShow}){

  const show = watchedShow.show;

  return(
    <div className="w-80 p-2 flex flex-col justify-center align-middle">
      <img className="rounded" key={show.tmdbId} src={show.posterUrl.value}></img>
      <h1 className="mx-auto mt-3">{show.title}</h1>
    </div>
  )
}
