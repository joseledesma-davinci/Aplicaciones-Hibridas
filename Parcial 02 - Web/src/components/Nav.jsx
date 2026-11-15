import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Nav() {
  const { usuario, autenticado, logout } = useAuth()
  const navigate = useNavigate()

  function cerrarSesion() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="nav">
      {/* Siempre visibles */}
      <Link to="/">Home</Link>
      <Link to="/mascotas">Mascotas</Link>
      <Link to="/refugios">Refugios</Link>

      {autenticado ? (
        <>
          <Link to="/perfil">Perfil</Link>
          {usuario?.rol === 'admin'   && <Link to="/admin">Admin</Link>}
          {usuario?.rol === 'refugio' && <Link to="/refugio">Refugio</Link>}
          <span>{usuario.nombre}</span>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  )
}

export default Nav