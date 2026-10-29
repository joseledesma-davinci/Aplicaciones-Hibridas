import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

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