import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/authContext";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Shows(){
  const navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthenticationContext);
  const [watchedShows, setWatchedShows] = useState([]);

  useEffect(() => {
    setAuth(localStorage.getItem('token') != null)
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
        <Carrousel watchedShows={watchedShows} />
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
      <div className="w-100 pt-16 mb-8 ms-8">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Recommended for you</Typography>
      </div>
    </div>
  )
}
