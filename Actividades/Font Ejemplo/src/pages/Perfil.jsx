import { useAuth } from "../context/AuthContext";

function Perfil(){

    const {usuario} = useAuth();
    //console.log(usuario);

    return(
    <section>
        <h2>Mi Perfil</h2>
        <ul>
            <li><strong>Nombre: </strong>{ usuario.nombre}</li>
            <li><strong>Email: </strong>{ usuario.email}</li>
            <li><strong>Rol: </strong>{ usuario.rol}</li>
        </ul>
    </section>
    )
}

export default Perfil