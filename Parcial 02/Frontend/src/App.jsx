import { Routes, Route } from 'react-router-dom'
import './App.css'

import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRouter from './components/RoleRouter'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'
import AccesoDenegado from './pages/AccesoDenegado'

import Mascotas from './pages/Mascotas'
import MascotaDetalle from './pages/MascotaDetalle'
import Refugios from './pages/Refugios'
import RefugioDetalle from './pages/RefugioDetalle'

import logo from './assets/patita verde.svg'

function App() {
  return (
    <>
      <header class="encabezado-principal">
        <div class="logo-titulo">
          <img src={logo} alt="Logo" class="logo-icono" />
          <h1>Adopción de Mascotas</h1>
        </div>
      </header>
      

      <Nav />

      <Routes>

        {/* Rutas públicas */}
        <Route path="/"              element={<Home />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/mascotas"      element={<Mascotas />} />
        <Route path="/mascotas/:id"  element={<MascotaDetalle />} />
        <Route path="/refugios"      element={<Refugios />} />
        <Route path="/refugios/:id"  element={<RefugioDetalle />} />
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />

        {/* Rutas protegidas: requieren sesión */}
        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Perfil />} />

          {/* Solo admin */}
          <Route element={<RoleRouter rolesPermitidos={['admin']} />}>
            <Route path="/admin" element={<div><h2>Panel Admin</h2></div>} />
          </Route>

          {/* Solo refugio */}
          <Route element={<RoleRouter rolesPermitidos={['refugio']} />}>
            <Route path="/refugio" element={<div><h2>Panel Refugio</h2></div>} />
          </Route>

        </Route>

      </Routes>

      <footer>
      <p><strong>Alumno:</strong> José Nicolás Ledesma</p>
      <p><strong>Materia:</strong> Aplicaciones Hibridas</p>
      <p><strong>Docente:</strong> Jonathan Emanuel Cruz</p>
      <p><strong>Comisión:</strong> DWN4AV</p>
    </footer>
    </>
  )
}

export default App