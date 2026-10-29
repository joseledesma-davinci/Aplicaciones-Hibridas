import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'


function App() {
  
  

  return (
    <>
      <h1>Mascotas</h1>
      
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        
      </Routes>
      
    </>
  )
}

export default App
