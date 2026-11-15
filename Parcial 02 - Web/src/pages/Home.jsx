import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerMascotas } from '../service/api'

function Home() {
  const [mascotas, setMascotas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarMascotas() {
      try {
        setCargando(true)
        setError(null)

        // Solo mostramos las disponibles en el home
        const result = await obtenerMascotas({ estado: 'disponible' })
        setMascotas(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarMascotas()
  }, [])

  if (cargando) return <p>Cargando mascotas...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="home-container">
      <h2>Mascotas en adopción</h2>

      {mascotas.length === 0 ? (
        <p>No hay mascotas disponibles en este momento.</p>
      ) : (
        <div className="cardContainer">
          {mascotas.map((mascota) => (
            <article key={mascota._id} className="cardMascota">
              <h4>{mascota.nombre}</h4>
              <p>Especie: {mascota.especie}</p>
              <p>Raza: {mascota.raza}</p>
              <p>Edad: {mascota.edad}</p>
              <Link to={`/mascotas/${mascota._id}`}>Ver detalles</Link>
            </article>
          ))}
        </div>
      )}

      <Link to="/mascotas">Ver todas las mascotas →</Link>
    </div>
  )
}

export default Home