import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerMascota } from '../service/api'

function MascotaDetalle() {
  const { id } = useParams()
  const [mascota, setMascota] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarMascota() {
      try {
        setCargando(true)
        setError(null)

        const result = await obtenerMascota(id)
        setMascota(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarMascota()
  }, [id])

  if (cargando) return <p>Cargando mascota...</p>
  if (error) return <p>Error: {error}</p>
  if (!mascota) return <p>Mascota no encontrada.</p>

  return (
    <div className="detalle-card">
      <h2>{mascota.nombre}</h2>

      <ul>
        <li><strong>Especie:</strong> {mascota.especie}</li>
        <li><strong>Raza:</strong> {mascota.raza}</li>
        <li><strong>Edad:</strong> {mascota.edad}</li>
        <li><strong>Tamaño:</strong> {mascota.tamanio}</li>
        <li><strong>Estado:</strong> {mascota.estado}</li>
        <li>
          <strong>Refugio:</strong>{' '}
          {mascota.refugio
            ? <Link to={`/refugios/${mascota.refugio._id}`}>{mascota.refugio.nombre}</Link>
            : 'Sin asignar'
          }
        </li>
      </ul>

      <Link to="/mascotas">← Volver al listado</Link>
    </div>
  )
}

export default MascotaDetalle