import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerRefugio } from '../service/api'

function RefugioDetalle() {
  const { id } = useParams()
  const [refugio, setRefugio] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarRefugio() {
      try {
        setCargando(true)
        setError(null)

        const result = await obtenerRefugio(id)
        setRefugio(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarRefugio()
  }, [id])

  if (cargando) return <p>Cargando refugio...</p>
  if (error) return <p>Error: {error}</p>
  if (!refugio) return <p>Refugio no encontrado.</p>

  return (
    <div>
      <h2>{refugio.nombre}</h2>

      <ul>
        <li><strong>Ciudad:</strong> {refugio.ciudad}</li>
        <li><strong>Dirección:</strong> {refugio.direccion}</li>
        <li><strong>Teléfono:</strong> {refugio.telefono}</li>
        <li><strong>Email:</strong> {refugio.email}</li>
      </ul>

      <Link to="/refugios">← Volver al listado</Link>
    </div>
  )
}

export default RefugioDetalle