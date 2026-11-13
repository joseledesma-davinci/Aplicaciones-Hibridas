import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { obtenerPerfil, subirFotoPerfil } from "../service/api";

const API_URL = import.meta.env.VITE_API_URL;

function Perfil(){

    const {usuario} = useAuth();
    //console.log(usuario);
    const [ perfil, setPerfil ] = useState(null);
    const [ archivo, setArchivo ] = useState(null);
    const [ preview, setPreview] = useState(null);


    // Estados de interfaz
    const [ cargando, setCargando ] = useState(true);
    const [ subiendo, setSubiendo ] = useState(false);
    const [ mensaje, setMensaje ] = useState(null);

    // Recuperamos los dato de la API
    useEffect( ()=> {
        async function cargarPerfil(){
            try {
                setCargando(true);

                const response = await obtenerPerfil();
                setPerfil(response.data);

            } catch (error) {
                setMensaje( error.message)
            } finally{
                setCargando(false)
            }
        }
        cargarPerfil();
    },[])

    const imagenActual = preview || (
        perfil?.profileImage ? `${API_URL}${perfil.profileImage}` : null
    );

    // Selección de la Imagen
    function seleccionarImagen( evento){
        const file = evento.target.files[0];
        if( !file){
            return;
        }
        // Validamos si es formato valido
        if( !['image/jpeg', 'image/png', 'image/webp'].includes( file.type ) ){
            setMensaje('Formato no valido');
            return;
        }
        // Validamos tamaño
        if( file.size >2 * 1024 * 1024){
            setMensaje('La imagen no puede superar los 2MB');
            return;
        }

        setArchivo( file );
        setPreview( URL.createObjectURL( file ));

        setMensaje("");

    }

    async function guardarImagen(evento){
        evento.preventDefault();

        if( !archivo){
            setMensaje('No se selecciono un archivo');
            return;
        }
        try {
            setSubiendo(true);
            setMensaje('');
            const response = await subirFotoPerfil( archivo);

            setPerfil( response.data);

            setArchivo(null);
            setPreview(null);
            setMensaje('Imange actualizada')


        } catch (error) {
            setMensaje(error.message)
        }
    }

    if( cargando){
        return <p>Cargando Perfil</p>
    }

    return(
    <section>
        <h2>Mi Perfil</h2>
        <ul>
            <li><strong>Nombre: </strong>{ perfil?.nombre}</li>
            <li><strong>Email: </strong>{ usuario.email}</li>
            <li><strong>Rol: </strong>{ usuario.rol}</li>
        </ul>
    
        <h2>Actualizar Foto de Perfil</h2>
        {
                imagenActual ? ( 
                    <img src={ imagenActual }  alt={ perfil?.nombre} width={128} /> 
                ) : (
                    <p> Sin foto de perfil</p>
                )
            }
        <form onSubmit={guardarImagen}>
            <input 
                type="file"
                id="profileImage"
                accept="image/jpeg,image/png,image/webp"
                onChange={seleccionarImagen} />
            <button type="submit" disabled={subiendo}>
                {subiendo ? 'Subiendo...' : 'Actualizar Foto'}
            </button>
        </form>
        {mensaje && <p>{mensaje}</p>}
    </section>
    )
}

export default Perfil