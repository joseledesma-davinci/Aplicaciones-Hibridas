import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

function Nav(){
    const { usuario, autenticado, logout } = useAuth();
    const navigate = useNavigate();

    function cerrarSesion(){
        logout();
        navigate('/login');
    }

    return(
        <nav className="nav">
            {
                autenticado ? (
                <> 
                    <Link to="/">Home</Link>
                    <Link to="/perfil">Perfil</Link>
                    {usuario?.rol === 'admin' && <Link to="/admin">Admin</Link>}
                    {usuario?.rol === 'refugio' && <Link to="/refugio">Refugio</Link>}
                    {usuario?.rol === 'usuario' && <Link to="/usuario">Usuario</Link>}
                    <Link>{ usuario.nombre }</Link>
                    <button onClick={ cerrarSesion }> Cerrar Sesion</button>
                    
                </>
                ) : (
                    <> 
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )
            }
        </nav>
    )
}

export default Nav