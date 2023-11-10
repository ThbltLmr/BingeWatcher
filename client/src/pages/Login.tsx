import { Navigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { login } from '../services/authService';
import Navbar from "../components/Navbar";
import { AuthenticationContext } from "../contexts/authContext";
import { useContext } from "react";

export default function Login(){
  const {auth, setAuth} = useContext(AuthenticationContext);
  if (auth) {
    return(
      <Navigate to="/shows" />
    )
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const password = e.currentTarget.password.value
    login(username, password)
    if (localStorage.getItem('token') !== null) {
      setAuth(true);
  }}

  return(
    <div>
      <Navbar />
      <div className="w-1/4 mx-auto text-center my-8 rounded border-2 p-8 bg-gray-200">
        <div className="mb-6">
          <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '4em' }}>Log in</Typography>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col text-left">
            <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="username">Username</label>
            <input className="mx-2 text-2xl" type="text" name="username" id="username" />
            <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="password">Password</label>
            <input className="mx-2 mb-8 text-2xl" type="password" name="password" id="password" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-light mx-2 text-3xl py-4 px-8 rounded">Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
