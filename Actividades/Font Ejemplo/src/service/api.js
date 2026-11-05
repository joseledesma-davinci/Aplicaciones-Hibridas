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

export async function fetchPrivado( endpoint, options={}) {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró token de autenticación');
    }

    const headers = new Headers(options?.headers || {});
    headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });
    const data = await response.json().catch(() => {});

    if (response.status === 401) {
        throw new Error('Sesión no válida. Por favor, inicia sesión nuevamente.');
    }

    if (response.status === 404) {
        throw new Error('Recurso no encontrado.');
    }

    if (!response.ok) {
        throw new Error('Error al obtener datos privados');
    }

    return data;
}