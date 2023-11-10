export default function CenterPopUp({show}: {show: Show}){
  return(
    <div className="absolute h-screen w-screen">
      <div className="absolute inset-x-1/2 inset-y-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-black">
        Add show
      </div>
    </div>
  )
}
