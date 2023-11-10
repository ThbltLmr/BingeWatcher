import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Typography from '@mui/material/Typography';
import { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/authContext";

export default function Shows(){
  const navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthenticationContext);
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

  const navigateToAddShow = () => {
    navigate("/addshow");
  }

  if (!auth) {
    navigate("/login");
  }

  return(
    <div>
      <Navbar />
      <div className="w-100 pt-16 mb-8 ms-8">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Track all your favourite shows</Typography>
      </div>
      <div className="m-8">
        <Carrousel shows={shows} />
      </div>
      <button onClick={navigateToAddShow} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-light mx-2 text-3xl py-4 px-8 rounded">Add show</button>
    </div>
  )
}
