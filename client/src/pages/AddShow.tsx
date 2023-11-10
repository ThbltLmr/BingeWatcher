import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Typography } from "@mui/material";
import { AuthenticationContext } from "../contexts/authContext";
import { useContext, useState } from "react";
import ShowCard from "../components/ShowCard";

export default function AddShow(){
  const {auth, setAuth} = useContext(AuthenticationContext);
  const [searchResults, setSearchResults] = useState([])

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

  if (!auth) {
    return(
      <Navigate to="/login" />
    )
  }



  return(
    <div>
      <Navbar/>
      <div className="mb-6">
        <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '4em' }}>Search shows</Typography>
        <form>
          <label htmlFor="tv">Search</label>
          <input type="text" onChange={updateSearchResults}/>
        </form>
        {searchResults.length > 0 &&
        searchResults.map((show) => (
           <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  )
}
