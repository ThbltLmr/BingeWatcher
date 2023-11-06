import { Navigate } from "react-router-dom";

export default function Login({auth, setAuth}: {auth: boolean, setAuth: Function}){

  if (auth) {
    return(
      <Navigate to="/profile" replace={true} />
    )
  }

  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const username = e.currentTarget.username.value
        const password = e.currentTarget.password.value
        login(username, password)
      }}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
