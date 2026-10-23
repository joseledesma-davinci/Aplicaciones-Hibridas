import { useState, useEffect } from 'react'
import { iniciarSesion } from '../service/api';

function Login() {
    //estados formulario login
  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState('mail@mail.com');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [cargando, setCargando] = useState(true);

  async function handleSubmit(event) {
      event.preventDefault();
      //setCargando(true);
  
      try {
        const result = await iniciarSesion(email, password);
        setMensaje(result.data.message);
      } catch (error) {
        setMensaje(error.message);
        console.error('Error al iniciar sesión:', error);
      } finally {
        //setCargando(false);
      }
    }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={cargando} type="submit">Iniciar Sesión</button>
      </form>

      <p> {mensaje} </p>
    </div>
  );
}

export default Login;