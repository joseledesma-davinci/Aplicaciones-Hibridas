# 🐾 Sistema de Adopción de Mascotas

API REST + Frontend React para gestión y consulta de mascotas en adopción.

---

## 👤 Datos del alumno

| Campo | Detalle |
|---|---|
| **Nombre y Apellido** | José Nicolás Ledesma |
| **Materia** | Aplicaciones Híbridas |
| **Docente** | Jonathan Emanuel Cruz |
| **Comisión** | DWN4AV |

---

## 📁 Estructura del proyecto

```
Parcial 02/
├── Backend/      → Backend Node.js + Express + MongoDB
└── Frontend/     → React + Vite
```

---

## 🔧 Backend — API REST

### Tecnologías
- Node.js con ES Modules
- Express
- MongoDB + Mongoose
- JWT para autenticación
- bcryptjs para hash de contraseñas

### Entidades
- `Usuario` (roles: `usuario`, `refugio`, `admin`)
- `Refugio`
- `Mascota`

### Endpoints

#### Auth (públicos)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |

#### Mascotas (públicos)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/mascotas` | Listar mascotas (filtros: especie, estado) |
| GET | `/api/mascotas/:id` | Detalle de una mascota |

#### Mascotas (admin)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/mascotas` | Crear mascota |
| PUT | `/api/mascotas/:id` | Actualizar mascota |
| DELETE | `/api/mascotas/:id` | Eliminar mascota |

#### Refugios (públicos)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/refugios` | Listar refugios |
| GET | `/api/refugios/:id` | Detalle de un refugio |

#### Refugios (admin)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/refugios` | Crear refugio |
| PUT | `/api/refugios/:id` | Actualizar refugio |
| DELETE | `/api/refugios/:id` | Eliminar refugio |

#### Usuarios (autenticado)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios/me` | Perfil propio |
| POST | `/api/usuarios/profileimage` | Subir foto de perfil |

#### Usuarios (admin)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Listar usuarios |
| GET | `/api/usuarios/:id` | Detalle de un usuario |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |

---

## 🖥️ Frontend — React + Vite

### Tecnologías
- React
- Vite
- React Router DOM
- jwt-decode
- Fetch API

### Vistas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Home con mascotas disponibles |
| `/mascotas` | Público | Catálogo con filtros |
| `/mascotas/:id` | Público | Detalle de mascota |
| `/refugios` | Público | Listado de refugios |
| `/refugios/:id` | Público | Detalle de refugio |
| `/login` | Público | Iniciar sesión |
| `/register` | Público | Registrar usuario |
| `/perfil` | Autenticado | Perfil y foto de perfil |
| `/admin` | Solo admin | Panel de administración |
| `/refugio` | Solo refugio | Panel de refugio |
| `/acceso-denegado` | Público | Acceso denegado |

---

## 🔐 Roles y permisos

| Acción | Sin sesión | Usuario / Refugio | Admin |
|---|---|---|---|
| Consultar mascotas y refugios | ✅ | ✅ | ✅ |
| Registrarse e iniciar sesión | ✅ | ✅ | ✅ |
| Ver perfil propio | ❌ | ✅ | ✅ |
| Subir foto de perfil | ❌ | ✅ | ✅ |
| Administrar usuarios | ❌ | ❌ | ✅ |
| Administrar mascotas y refugios | ❌ | ❌ | ✅ |
