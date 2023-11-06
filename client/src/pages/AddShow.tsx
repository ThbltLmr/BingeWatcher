import Navbar from "../components/Navbar";

export default function AddShow({auth, setAuth}: {auth: boolean, setAuth: Function}){
  return(
    <div>
      <Navbar auth={auth} setAuth={setAuth}/>
      Add Show
    </div>
  )
}
