import Navbar from "../components/Navbar";
import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
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
      <div className="mb-6 w-4/5 mx-auto flex flex-col align-middle text-center">
        {showPopUp &&
        <div className="z-10">
          <CenterPopUp show={selectedShow} />
        </div>
        }
        <div className="w-full pt-16 mb-12">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Search shows</Typography>
        </div>
        <div className="w-1/3 mb-8 mx-auto z-0">
          <TextField id="outlined-basic" sx={{marginLeft: '2rem', width: '80%', zIndex: '0'}} ref={inputRef} onChange={updateSearchResults} variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          />
        </div>
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
