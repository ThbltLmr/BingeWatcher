import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Typography } from "@mui/material";
import { AuthenticationContext } from "../contexts/authContext";
import { useContext, useState } from "react";
import ShowCard from "../components/ShowCard";
import CenterPopUp from "../components/CenterPopUp";

export default function AddShow(){
  const {auth, setAuth} = useContext(AuthenticationContext);
  const [searchResults, setSearchResults] = useState([])
  const [showPopUp, setShowPopUp] = useState(false)
  const [selectedShow, setSelectedShow] = useState({})

  const updateSearchResults = async (e: any) => {
    fetch(`http://localhost:3000/tmdbapi/search?tv=${e.target.value}`)
    .then(response => response.json())
    .then(data => {
      const results = data.map((show: any) => {
        return {
          title: show.name,
          description: show.overview,
          posterURL: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
          numberOfSeasons: show.number_of_seasons,
          genres: show.genres_ids,
          TMDBid: show.id
        }
      })
      setSearchResults(results)
    })
  }

  const openPopUp = (e) => {
    const currentShow = searchResults.find((show) => show.TMDBid == e.currentTarget.id)
    setSelectedShow(currentShow)
    setShowPopUp(true)
  }

  if (!auth) {
    return(
      <Navigate to="/login" />
    )
  }



  return(
    <div className="relative">
      <Navbar/>
      <div className="mb-6">
        {showPopUp && <CenterPopUp show={selectedShow} />}
        <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '4em' }}>Search shows</Typography>
        <form>
          <label htmlFor="tv">Search</label>
          <input type="text" onChange={updateSearchResults}/>
        </form>
        <div className="flex flex-row flex-wrap">
          {searchResults.length > 0 &&
          searchResults.map((show) => (
            <div id={show.TMDBid} className="w-92 m-2" onClick={openPopUp}>
              <ShowCard key={show.TMDBid} show={show} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
