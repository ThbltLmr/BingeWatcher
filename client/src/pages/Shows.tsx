import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Typography from '@mui/material/Typography';
import { useState } from "react";

export default function Shows({auth}: {auth: boolean}){
  const [shows, setShows] = useState([
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 1
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 2
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 3
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 4
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 5
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 6
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 7
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 8
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 9
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 10
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 11
    },
    {
      title: "Suits",
      posterURL: "src/assets/suits.jpeg",
      TMDBid: 12
    },
  ])

  if (!auth) {
    return(
      <Navigate to="/login" replace={true} />
    )
  }

  return(
    <div>
      <Navbar auth={auth}/>
      <div className="w-100 pt-16 mb-8 ms-8">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Track all your favourite shows</Typography>
      </div>
      <div className="m-8">
        <Carrousel shows={shows} />
      </div>
    </div>
  )
}
