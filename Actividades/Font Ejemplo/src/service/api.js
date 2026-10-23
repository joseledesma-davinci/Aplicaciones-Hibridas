const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerMascotas() {
    const response = await fetch(`${API_URL}/api/mascotas`);
    if (!response.ok) {
        throw new Error('Error al obtener las mascotas');
    }
    return response.json();
}

export async function iniciarSesion(email, password) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Error al iniciar sesión');
    }
    return data;
}

export async function registrarUsuario(nombre, email, password) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, password })
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Error al registrar usuario');
    }
    return data;
}