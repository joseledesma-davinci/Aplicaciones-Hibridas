import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== 'string') {
    return res.status(401).json({
      message: 'Token requerido'
    });
  }

  const partes = authHeader.trim().split(/\s+/);

  if (
    partes.length !== 2 ||
    partes[0].toLowerCase() !== 'bearer'
  ) {
    return res.status(401).json({
      message: 'Formato de autorización inválido. Usá Bearer <token>'
    });
  }

  if (!SECRET_KEY) {
    return res.status(500).json({
      message: 'Error de configuración de autenticación'
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(partes[1], SECRET_KEY, {
      algorithms: ['HS256']
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o vencido'
    });
  }

  if (
    typeof decoded !== 'object' ||
    decoded === null ||
    typeof decoded.id !== 'string' ||
    !/^[a-fA-F0-9]{24}$/.test(decoded.id)
  ) {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }

  try {
    const usuario = await Usuario.findById(decoded.id)
      .select('_id nombre email rol');

    if (!usuario) {
      return res.status(401).json({
        message: 'El usuario del token ya no existe'
      });
    }

    req.user = {
      id: usuario._id.toString(),
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };
  } catch (error) {
    console.error('Error al verificar el usuario:', error);

    return res.status(500).json({
      message: 'Error al verificar la autenticación'
    });
  }

  next();
};

export default authMiddleware;