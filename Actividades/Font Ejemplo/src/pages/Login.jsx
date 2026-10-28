import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { iniciarSesion } from '../service/api';
import { useAuth } from '../context/AuthContext';

function Login() {
    //estados formulario login
  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState('mail@mail.com');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate(); 

  async function handleSubmit(event) {
      event.preventDefault();
      setCargando(true);
  
      try {
        await login(email, password)
        navigate('/');
      } catch (error) {
        setMensaje(error.message);
        console.error('Error al iniciar sesión:', error);
      } finally {
        setCargando(false);
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