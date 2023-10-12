import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  Profile,
  Login,
  AddShow,
  SignUp,
  Shows
} from './pages'
import './App.css'
import { useState } from 'react'

function App() {
  const [auth, setAuth] = useState(false)
  function login(){}
  function logout(){}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage auth={auth} />} />
          <Route path="/login" element={<Login auth={auth} login={login}/>} />
          <Route path="/profile" element={<Profile auth={auth} />} />
          <Route path="/signup" element={<SignUp auth={auth} />} />
          <Route path="/addshow" element={<AddShow auth={auth} />} />
          <Route path="/shows" element={<Shows auth={auth} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
