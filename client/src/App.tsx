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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage auth={auth} setAuth={setAuth} />} />
          <Route path="/login" element={<Login auth={auth} setAuth={setAuth} />} />
          <Route path="/profile" element={<Profile auth={auth} setAuth={setAuth} />} />
          <Route path="/signup" element={<SignUp auth={auth} setAuth={setAuth} />} />
          <Route path="/addshow" element={<AddShow auth={auth} setAuth={setAuth} />} />
          <Route path="/shows" element={<Shows auth={auth} setAuth={setAuth} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
