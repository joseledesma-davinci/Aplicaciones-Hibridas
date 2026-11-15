import { useState, useEffect } from 'react'
import { registrarUsuario } from '../service/api';
import { useNavigate } from 'react-router-dom';

function Register() {
      //estados formulario registro
      const [usuario, setUsuario] = useState({ name: '', email: '', password: '', confirmPassword: '' });
      const [mensaje, setMensaje] = useState('');

      async function handleRegistro(event) {
        event.preventDefault();
    
        if (usuario.password !== usuario.confirmPassword) {
          setMensaje('Las contraseñas no coinciden');
          return;
        }
    
        setCargando(true);
    
        try {
          const result = await registrarUsuario(usuario.name, usuario.email, usuario.password);
          setMensaje(result.data.message);
          setUsuario({ name: '', email: '', password: '', confirmPassword: '' }); // Limpiar el formulario después del registro exitoso
          navigate('/login'); // Redirigir al usuario a la página de login después del registro exitoso
        } catch (error) {
          setMensaje(error.message);
          console.error('Error al registrar usuario:', error);
        } finally {
          setCargando(false);
        }
      }
    
      function handleInputChange(event) {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
      }

      const [cargando, setCargando] = useState(true);
    

  return (
    <div>
      <h2>Registrar</h2>
      <form onSubmit={handleRegistro} className="register-form">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name='name'
          value={usuario.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name='email'
          value={usuario.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name='password'
          value={usuario.password}
          onChange={handleInputChange}
          required

        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name='confirmPassword'
          value={usuario.confirmPassword}
          onChange={handleInputChange}
          required

        />
        <button  type="submit">Registrar</button>
      </form>

      <p> {mensaje} </p>
    </div>
  );
}

export default Register;