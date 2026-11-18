import {useState, useEffect} from 'react'
import {fetchPrivado} from '../service/api'
import reactLogo from '../assets/vite.svg'

function Admin() {
  const [refugios, setRefugios] = useState([]);
  const endPoint = '/api/refugios';

  useEffect(() => {
    async function getRefugios() {
      try {
      const res = await fetchPrivado(endPoint);
      setRefugios(res.data);
    } catch (error) {
      console.error('Error al obtener los refugios:', error);
    }
  }
  getRefugios();
}, []);


  return (
    <div>
      <h1>Panel de Administración</h1>
        <p>Bienvenido al panel de administración. Aquí puedes gestionar las mascotas y los usuarios.</p>
        
      <h4>Refugios</h4>

      <div className="cardContainer">
            {refugios.map((refugio) => (
              <article key={refugio._id} className="cardMascota">
                <img src={reactLogo} alt={refugio.nombre} />
                
                <h4>Nombre: {refugio.nombre}</h4>
                <h4>Dirección: {refugio.direccion}</h4>
                <button>Ver Detalles</button>
              </article>
            ))}
            </div>
    </div>
  )
}

export default Admin