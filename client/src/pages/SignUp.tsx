import { useContext } from "react";
import { AuthenticationContext } from "../contexts/authContext";

export default function SignUp(){
  const {auth, setAuth} = useContext(AuthenticationContext);
  return(
    <div>
      SignUp
    </div>
  )
}
