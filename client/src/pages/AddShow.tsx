import Navbar from "../components/Navbar";
import { Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ShowCard from "../components/ShowCard";
import CenterPopUp from "../components/CenterPopUp";
import { Show } from "../types";
import { useAuth } from "../contexts/authContext";

export default function AddShow(){
  const { checkAuth } = useAuth();
  const [searchResults, setSearchResults] = useState([])
  const [showPopUp, setShowPopUp] = useState(false)
  const [selectedShow, setSelectedShow] = useState({})
  const abortController = useRef(new AbortController());

  const inputRef = useRef(null);

  useEffect(() =>  {
    checkAuth();
  }, [])


  const updateSearchResults = async (e: any) => {
    if (!abortController.current) { abortController.current = new AbortController() }
    fetch(`http://localhost:3000/tmdbapi/search?tv=${e.target.value}`, {signal: abortController.current.signal})
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
    abortController.current.abort();
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
