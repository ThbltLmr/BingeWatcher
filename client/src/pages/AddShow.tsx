import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Typography } from "@mui/material";
import { AuthenticationContext } from "../contexts/authContext";
import { useContext, useEffect, useState, useRef } from "react";
import ShowCard from "../components/ShowCard";
import CenterPopUp from "../components/CenterPopUp";
import { Show } from "../types";

export default function AddShow(){
  const navigate = useNavigate()
  const {auth, setAuth} = useContext(AuthenticationContext);
  const [searchResults, setSearchResults] = useState([])
  const [showPopUp, setShowPopUp] = useState(false)
  const [selectedShow, setSelectedShow] = useState({})

  const inputRef = useRef(null);

  useEffect(() =>  {
    setAuth(localStorage.getItem('token') != null)
    if (!auth) {
      navigate("/login")
    }
  }, [])


  const updateSearchResults = async (e: any) => {
    fetch(`http://localhost:3000/tmdbapi/search?tv=${e.target.value}`)
    .then(response => response.json())
    .then(data => {
      const results = data.map((show: any): Show => {
        return {
          title: show.title,
          description: show.description,
          posterUrl: show.posterUrl,
          numberOfSeasons: show.numberOfSeasons,
          genres: show.genres.map((genre: {name: string}) => {
            return genre.name;
          }),
          tmdbId: show.tmdbId
        }
      })
      setSearchResults(results)
    })
  }

  const openPopUp = (e) => {
    const currentShow = searchResults.find((show: Show) => show.tmdbId == e.currentTarget.id)
    setSelectedShow(currentShow)
    setSearchResults([])
    if (inputRef.current) { inputRef.current.value = "" }
    setShowPopUp(true)
  }

  return(
    <div className="relative">
      <Navbar/>
      <div className="mb-6">
        {showPopUp && <CenterPopUp show={selectedShow} />}
        <div className="w-100 pt-16 mb-8 ms-8">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Search shows</Typography>
        </div>
        <form className="ms-8">
          <label htmlFor="tv">Search</label>
          <input type="text" ref={inputRef} onChange={updateSearchResults}/>
        </form>
        <div className="flex flex-row flex-wrap ms-6">
          {searchResults.length > 0 &&
          searchResults.map((show: Show) => (
            <div id={show.tmdbId.toString()} className="w-1/6 p-2" onClick={openPopUp}>
              <ShowCard key={show.tmdbId} show={show} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
