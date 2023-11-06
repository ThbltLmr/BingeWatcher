import { Navigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { login } from '../services/authService';
import Navbar from "../components/Navbar";

export default function Login({auth, setAuth}: {auth: boolean, setAuth: Function}){

  if (auth) {
    return(
      <Navigate to="/shows" replace={true} />
    )
  }

  return(
    <div>
      <Navbar auth={auth} setAuth={setAuth} />
      <div className="w-1/4 mx-auto text-center my-8 rounded border-2 p-8 bg-gray-200">
        <div className="mb-6">
          <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '4em' }}>Log in</Typography>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          const username = e.currentTarget.username.value
          const password = e.currentTarget.password.value
          login(username, password)
          if (localStorage.getItem('token') !== null) { setAuth(true) }
        }}>
          <div className="flex flex-col text-left">
            <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="username">Username</label>
            <input className="mx-2 text-2xl" type="text" name="username" id="username" />
            <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="password">Password</label>
            <input className="mx-2 mb-6 text-2xl" type="password" name="password" id="password" />
            <button type="submit" className="py-3 px-5 bg-white mt-5 w-fit self-center text-3xl font-semibold">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
