import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario.js";

class UsuarioController {
    async getAll( req, res) {
        try {
            const usuarios = await Usuario.find().select('-password -createdAt');

            res.json({
                message:'success',
                data: usuarios
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los usuarios'
            })
        }
    }
    async getById( req, res) {
        try {
            const id = req.params.id;
            const usuario = await Usuario.findById( id ).select('-password -createdAt');

            if( !usuario){
                return res.status(404).json({
                    message:'Usuario no encontrado',
                    data: usuario
                });
            }
            res.json({
                message:'success'
            })

        } catch (error) {
            console.error( error);
            res.status(500).json({
                message: 'Error al obtener el usuario'
            })
        }
    }
    async create(req, res) {
          try {
            const { nombre, email, password } = req.body;
            if( !nombre || !email || !password){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }
            const passwordHash = await bcrypt.hash( password, 10);
            const usuario = await Usuario.create({ nombre, email, password: passwordHash})

            res.json({
                message:'success',
                data: usuario
            })

        } catch (error) {
            console.error( error );
            res.status(500).json({
                message: 'Error al crear el usuario'
            })
        }
    }
    async update(req, res) {
          try {
            const id = req.params.id;

            const { nombre, email, password } = req.body;
            if( !nombre || !email || !password){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }
            const passwordHash = await bcrypt.hash( password, 10);
            const usuario = await Usuario.findByIdAndUpdate(
                id, 
                { nombre, email, passwordHash},
                { new: true }
            )

            res.json({
                message:'success',
                data: usuario
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar el usuario'
            })
        }
    }
    async delete(req, res) {
          try {
            const id = req.params.id;

            const usuario = await Usuario.findByIdAndDelete(id);

            if( !usuario){
                return  res.status(404).json({
                            message:'Usuario no encontrado'            
                        });
            }

            res.json({
                message:'success'
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar la materia'
            })
        }
    }
}

export default UsuarioController;
