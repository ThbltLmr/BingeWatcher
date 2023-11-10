import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Typography } from "@mui/material";
import { AuthenticationContext } from "../contexts/authContext";
import { useContext } from "react";

export default function AddShow(){
  const {auth, setAuth} = useContext(AuthenticationContext);

  if (!auth) {
    return(
      <Navigate to="/login" />
    )
  }

  return(
    <div>
      <Navbar/>
      <div className="mb-6">
        <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '4em' }}>Log in</Typography>
      </div>
    </div>
  )
}
