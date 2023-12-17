import { Show } from "../types";
import WatchedShowCard from "./WatchedShowCard";

export default function CenterPopUp({show}: {show: Show}){
  return(
    <div className="absolute h-screen w-screen bg-black bg-opacity-70">
      <div className="absolute w-max h-max inset-x-1/2 inset-y-1/3 -translate-x-1/2 -translate-y-1/2 p-3 bg-slate-200">
        <div className="flex flex-col m-2">
          <WatchedShowCard show={show} />
          <button>Add show</button>
        </div>
      </div>
    </div>
  )
}
