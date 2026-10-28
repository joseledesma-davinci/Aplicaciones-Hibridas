import { useState, useEffect } from 'react'
import { obtenerMascotas } from '../service/api';
import reactLogo from '../assets/vite.svg'


function Home() {
    const [mascotas, setMascotas] = useState([]);

  async function getMascotas() {
    try {
      const result = await obtenerMascotas();
      setMascotas(result.data);
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
    } finally {
      console.log('Petición finalizada');
    }
  }

  useEffect(() => {
    getMascotas();
  }, []);
  return (
    <div className="home-container">
      <h2>Home</h2>

      <h4>Lista de Mascotas</h4>

      <div className="cardContainer">
      {mascotas.map((mascota) => (
        <article key={mascota._id} className="cardMascota">
          <img src={reactLogo} alt={mascota.nombre} />
          
          <h4>Nombre: {mascota.nombre}</h4>
          <h4>Raza: {mascota.raza}</h4>
          <h4>Edad: {mascota.edad}</h4>
          <button>Ver Detalles</button>
        </article>
      ))}
      </div>
      

      
    </div>
  );
}

export default Home;