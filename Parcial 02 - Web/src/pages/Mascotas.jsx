import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerMascotas } from '../service/api'

function Mascotas() {
  const [mascotas, setMascotas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [filtros, setFiltros] = useState({ especie: '', estado: '' })

  useEffect(() => {
    async function buscarMascotas() {
      try {
        setCargando(true)
        setError(null)

        // Limpiamos los filtros vacíos antes de enviar
        const filtrosActivos = Object.fromEntries(
          Object.entries(filtros).filter(([, v]) => v !== '')
        )

        const result = await obtenerMascotas(filtrosActivos)
        setMascotas(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    buscarMascotas()
  }, [filtros])

  function handleFiltro(e) {
    const { name, value } = e.target
    setFiltros({ ...filtros, [name]: value })
  }

  if (cargando) return <p>Cargando mascotas...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Mascotas en adopción</h2>

      <form>
        <label htmlFor="especie">Especie:</label>
        <select
          id="especie"
          name="especie"
          value={filtros.especie}
          onChange={handleFiltro}
        >
          <option value="">Todas</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>

        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={filtros.estado}
          onChange={handleFiltro}
        >
          <option value="">Todos</option>
          <option value="disponible">Disponible</option>
          <option value="adoptado">Adoptado</option>
        </select>
      </form>

      {mascotas.length === 0 ? (
        <p>No hay mascotas disponibles.</p>
      ) : (
        <div className="cardContainer">
          {mascotas.map((mascota) => (
            <article key={mascota._id} className="cardMascota">
              <h4>{mascota.nombre}</h4>
              <p>Especie: {mascota.especie}</p>
              <p>Edad: {mascota.edad}</p>
              <p>Estado: {mascota.estado}</p>
              <Link to={`/mascotas/${mascota._id}`}>Ver detalles</Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Mascotas