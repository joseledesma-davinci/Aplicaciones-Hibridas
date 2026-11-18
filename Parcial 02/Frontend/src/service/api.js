const API_URL = import.meta.env.VITE_API_URL;

// ─────────────────────────────────────────
// MASCOTAS (públicas)
// ─────────────────────────────────────────

export async function obtenerMascotas(filtros = {}) {
  const params = new URLSearchParams(filtros).toString();
  const url = params
    ? `${API_URL}/api/mascotas?${params}`
    : `${API_URL}/api/mascotas`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener las mascotas');
  }
  return response.json();
}

export async function obtenerMascota(id) {
  const response = await fetch(`${API_URL}/api/mascotas/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener la mascota');
  }
  return response.json();
}

// ─────────────────────────────────────────
// REFUGIOS (públicas)
// ─────────────────────────────────────────

export async function obtenerRefugios() {
  const response = await fetch(`${API_URL}/api/refugios`);
  if (!response.ok) {
    throw new Error('Error al obtener los refugios');
  }
  return response.json();
}

export async function obtenerRefugio(id) {
  const response = await fetch(`${API_URL}/api/refugios/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener el refugio');
  }
  return response.json();
}

// ─────────────────────────────────────────
// AUTH (públicas)
// ─────────────────────────────────────────

export async function iniciarSesion(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Error al iniciar sesión');
  }
  return data;
}

export async function registrarUsuario(nombre, email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Error al registrar usuario');
  }
  return data;
}

// ─────────────────────────────────────────
// FETCH PRIVADO (base para rutas con token)
// ─────────────────────────────────────────

export async function fetchPrivado(endpoint, options = {}) {
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
    throw new Error('Sesión no válida. Por favor, iniciá sesión nuevamente.');
  }
  if (response.status === 403) {
    throw new Error('No tenés permisos para realizar esta acción.');
  }
  if (response.status === 404) {
    throw new Error('Recurso no encontrado.');
  }
  if (!response.ok) {
    throw new Error(data?.message || 'Error al realizar la petición');
  }

  return data;
}

// ─────────────────────────────────────────
// USUARIOS (privadas)
// ─────────────────────────────────────────

export async function obtenerPerfil() {
  return await fetchPrivado('/api/usuarios/me');
}

export async function subirFotoPerfil(archivo) {
  const formData = new FormData();
  formData.append('profileImage', archivo);

  return await fetchPrivado('/api/usuarios/profileimage', {
    method: 'POST',
    body: formData
  });
}