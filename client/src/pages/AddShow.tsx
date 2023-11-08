import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Typography } from "@mui/material";

export default function AddShow({auth, setAuth}: {auth: boolean, setAuth: Function}){

  if (!auth) {
    return(
      <Navigate to="/login" replace={true} />
    )
  }

  return(
    <div>
      <Navbar auth={auth} setAuth={setAuth}/>
      <div className="mb-6">
        <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '4em' }}>Log in</Typography>
      </div>
    </div>
  )
}
