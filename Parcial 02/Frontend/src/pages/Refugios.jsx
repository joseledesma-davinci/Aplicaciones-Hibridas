import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerRefugios } from '../service/api'

function Refugios() {
  const [refugios, setRefugios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarRefugios() {
      try {
        setCargando(true)
        setError(null)

        const result = await obtenerRefugios()
        setRefugios(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarRefugios()
  }, [])

  if (cargando) return <p>Cargando refugios...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Refugios</h2>

      {refugios.length === 0 ? (
        <p>No hay refugios registrados.</p>
      ) : (
        <div className="cardContainer">
          {refugios.map((refugio) => (
            <article key={refugio._id} className="cardMascota">
              <h4>{refugio.nombre}</h4>
              <p>Ciudad: {refugio.ciudad}</p>
              <Link to={`/refugios/${refugio._id}`}>Ver detalles</Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Refugios