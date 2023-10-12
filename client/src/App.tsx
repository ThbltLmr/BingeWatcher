import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AddShow from './pages/AddShow'
import SignUp from './pages/SignUp'
import Shows from './pages/Shows'
import './App.css'
import { useState } from 'react'

function App() {
  const [auth, setAuth] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage auth={auth} />} />
          <Route exact path="/login" element={<Login auth={auth} setAuth={setAuth}/>} />
          <Route exact path="/profile" element={<Profile auth={auth} />} />
          <Route exact path="/signup" element={<SignUp auth={auth} />} />
          <Route exact path="/addshow" element={<AddShow auth={auth} />} />
          <Route exact path="/show" element={<Shows auth={auth} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
