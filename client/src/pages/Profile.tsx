import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile({auth}: {auth: boolean}){
  if (!auth) {
    return(
      <Navigate to="/login" replace={true} />
    )
  }
  return(
    <div>
      <Navbar auth={auth}/>
    </div>
  )
}
