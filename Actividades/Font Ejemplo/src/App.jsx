import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  

  return (
    <>
      <h1>Mascotas</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      
    </>
  )
}

export default App
