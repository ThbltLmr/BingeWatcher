import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/authContext";

export default function Shows(){
  const navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthenticationContext);
  const [watchedShows, setWatchedShows] = useState([]);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/watchedshows", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      const shows = data.map((watchedShow: any) => {
        return { show: watchedShow.show, watchedSeasons: watchedShow.seasonsWatched };
      });
      setWatchedShows(shows);
    })
    .catch(err => {
      console.log(err);
    })
  });

  const navigateToAddShow = () => {
    navigate("/addshow");
  }


  return(
    <div>
      <Navbar />
      <div className="w-100 pt-16 mb-8 ms-8">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Track all your favourite shows</Typography>
      </div>
      <div className="m-8">
        <Carrousel watchedShows={watchedShows} />
      </div>
      <button onClick={navigateToAddShow} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-light mx-2 text-3xl py-4 px-8 rounded">Add show</button>
    </div>
  )
}
