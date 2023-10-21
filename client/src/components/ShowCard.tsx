import { Show } from "../types";

export default function ShowCard({show}: {show: Show}){
  return(
    <div className="w-80">
      <img className="m-2 rounded" key={show.TMDBid} src={show.posterURL}></img>
      <h1>{show.TMDBid}</h1>
    </div>
  )
}
