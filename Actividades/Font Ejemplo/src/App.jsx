import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRouter from './components/RoleRouter'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'
import AccesoDenegado from './pages/AccesoDenegado'
import Admin from './pages/Admin'
import Refugio from './pages/Refugio'
import Usuario from './pages/Usuario'


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
          <Route element={<RoleRouter rolesPermitidos={['admin']}/>} >
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<RoleRouter rolesPermitidos={['refugio']}/>} >
            <Route path="/refugio" element={<Refugio />} />
          </Route>
          <Route element={<RoleRouter rolesPermitidos={['usuario']}/>} >
            <Route path="/usuario" element={<Usuario />} />
          </Route>
        </Route>
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />
        
      </Routes>
      
    </>
  )
}

export default App
