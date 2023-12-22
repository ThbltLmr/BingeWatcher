import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";

export default function Shows(){
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const [watchedShows, setWatchedShows] = useState([]);
  const [savedShows, setSavedShows] = useState([]);

  useEffect(() => {
    checkAuth();
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/watchedshows", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.status === 401) {
        navigate("/login");
      } else {
        return res.json()
      }
    })
    .then(data => {
      const shows = data.map((watchedShow: any) => {
        return { show: watchedShow.show, watchedSeasons: watchedShow.seasonsWatched };
      });
      setWatchedShows(shows);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const navigateToAddShow = () => {
    navigate("/addshow");
  }


  return(
    <div>
      <Navbar />
      <div className="flex align-middle">
        <div className="w-100 pt-16 mb-8 ms-8">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Currently watching</Typography>
        </div>
        <div className="ms-8 mb-9 w-1/6 self-end">
          <Button onClick={navigateToAddShow} variant="contained" endIcon={<AddCircleOutlineIcon />}>
              Add another show
          </Button>
        </div>
      </div>
      <div className="m-8">
        <Carrousel watchedShows={watchedShows.filter((watchedShow) => { return watchedShow.watchedSeasons > 0})} />
      </div>
      <div className="flex align-middle">
        <div className="w-100 pt-16 mb-8 ms-8">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Saved for later</Typography>
        </div>
        <div className="ms-8 mb-9 w-1/6 self-end">
          <Button onClick={navigateToAddShow} variant="contained" endIcon={<AddCircleOutlineIcon />}>
              Add another show
          </Button>
        </div>
      </div>
      <div className="m-8">
        <Carrousel watchedShows={watchedShows.filter((watchedShow) => { return watchedShow.watchedSeasons === 0})} />
      </div>
      <div className="w-100 pt-16 mb-8 ms-8">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Recommended for you</Typography>
      </div>
    </div>
  )
}
