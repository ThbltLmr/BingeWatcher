import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useRef, useState } from "react";

export default function SignUp(){
  const passwordRef = useRef(null)
  const confirmRef = useRef(null)
  const [disabled, setDisabled] = useState(true)

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password})
    })
  }

  const handlePasswordChange = () => {
    if (!passwordRef.current.value) {setDisabled(true)}
    if (passwordRef.current.value && (passwordRef.current.value === confirmRef.current.value)) {setDisabled(false)}
    if (passwordRef.current.value && (passwordRef.current.value !== confirmRef.current.value)) {setDisabled(true)}
  }

  const handleConfirmChange = () => {
    if (!confirmRef.current.value) {setDisabled(true)}
    if (confirmRef.current.value && (passwordRef.current.value === confirmRef.current.value)) {setDisabled(false)}
    if (confirmRef.current.value && (passwordRef.current.value !== confirmRef.current.value)) {setDisabled(true)}
  }

  return(
    <div>
    <Navbar />
    <div className="w-1/4 mx-auto text-center my-8 rounded border-2 p-8 bg-gray-200">
      <div className="mb-6">
        <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '4em' }}>Log in</Typography>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col text-left">
          <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="username">Username</label>
          <input className="mx-2 text-2xl" type="text" name="username" id="username" />
          <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="email">Email</label>
          <input className="mx-2 text-2xl" type="text" name="email" id="email" />
          <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="password">Password</label>
          <input className="mx-2 mb-2 text-2xl" ref={passwordRef} type="password" onChange={handlePasswordChange} name="password" id="password" />
          <label className="mt-3 mb-2 mx-2 text-2xl" htmlFor="confirm">Confirm password</label>
          <input className="mx-2 mb-8 text-2xl" ref={confirmRef} type="password" onChange={handleConfirmChange} name="confirm" id="confirm" />
          <button type="submit" className={`${disabled ? "bg-slate-300" : "bg-blue-500 hover:bg-blue-700"} text-white font-light mx-2 text-3xl py-4 px-8 rounded`} disabled={disabled} >Log in</button>
        </div>
      </form>
    </div>
  </div>
  )
}
