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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addshow" element={<AddShow />} />
          <Route path="/shows" element={<Shows />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
