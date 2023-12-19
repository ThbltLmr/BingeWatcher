import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";

export default function Profile(){
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return(
    <div>
      <Navbar />
    </div>
  )
}
