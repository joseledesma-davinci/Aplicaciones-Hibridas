import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function RoleRouter({ rolesPermitidos }) {
    const { usuario, autenticado } = useAuth();

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    if (!rolesPermitidos.includes(usuario?.rol)) {
        return <Navigate to="/acceso-denegado" replace />;
    }

    return <Outlet />;
}

export default RoleRouter;