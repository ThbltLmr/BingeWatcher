import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthenticationContext } from "../contexts/authContext";
import { useContext } from "react";

export default function Profile(){
  const {auth, setAuth} = useContext(AuthenticationContext);
  if (!auth) {
    return(
      <Navigate to="/login" />
    )
  }
  return(
    <div>
      <Navbar />
    </div>
  )
}
