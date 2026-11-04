import { Link } from 'react-router-dom';

function AccesoDenegado() {
    return (
        <div className="acceso-denegado">
            <h2>403 - Acceso Denegado</h2>
            <p>No tienes permisos para acceder a esta página.</p>
            <Link to="/login">Volver al login</Link>
        </div>
    );
}

export default AccesoDenegado;