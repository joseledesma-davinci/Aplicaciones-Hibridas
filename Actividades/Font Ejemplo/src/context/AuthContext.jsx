import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { iniciarSesion } from "../service/api";

const AuthContext = createContext(null);

function obtenerSesion(token) {
    if (!token) {
        return { token : null, usuario : null };
    }
    
    try {
        const payload = jwtDecode(token);
        
        if (!payload.exp || payload.exp *1000 <= Date.now()) {
            return { token : null, usuario : null };
        }

        const usuario = {
            id: payload.id,
            nombre: payload.nombre,
            rol: payload.rol,
            email: payload.email
        };
        return { token, usuario };

    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return { token : null, usuario : null };
    }
}

function restaurarSesion() {
    // const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    const sesion = obtenerSesion(token);
    
    if (!sesion.token) {
        sessionStorage.removeItem("token");
    }

    return sesion;
}

export const AuthProvider = ({ children }) => {
    const [ sesion, setSesion ] = useState(restaurarSesion);

    async function login(email, password) {
        const data = await iniciarSesion(email, password);

        if (!data.token){
            throw new Error("No se recibio el token")
        }

        const nuevaSesion = obtenerSesion(data.token);

        if(!nuevaSesion.token){
            throw new Error("El token es invalido")
        }

        sessionStorage.setItem('token', nuevaSesion.token)
        setSesion(nuevaSesion);
    }

    function logout() {
        sessionStorage.removeItem('token');
        setSesion({ token : null, usuario : null });
    }
    
    return (
        <AuthContext.Provider value={{ 
            token: sesion.token,
            usuario: sesion.usuario,
            autenticado: (sesion.token && sesion.usuario),
            login, logout
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}