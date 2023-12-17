import { Show } from "../types";

export default function ShowCard({show}: {show: Show}){

  return(
    <div className="p-2 flex flex-col h-full justify-center align-middle relative">
      <img className="rounded max-w-none h-full" key={show.tmdbId} src={show.posterUrl.value}></img>
      <div className="absolute w-full bottom-0 h-1/5 bg-white opacity-90 flex flex-col justify-center align-middle">
        <h1 className="mx-auto text-center font-semibold text-lg">{show.title}</h1>
        <h2 className="mx-auto text-center text-lg">{show.numberOfSeasons} seasons available</h2>
      </div>
    </div>
  )
}
