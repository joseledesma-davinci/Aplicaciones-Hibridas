import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario.js";

class UsuarioController {
    async getAll( req, res) {
        try {
            const usuario = await Usuario.find();

            res.json({
                message:'success',
                data: usuario
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
            const usuario = await Usuario.findById( id );

            if( !usuario){
                return res.status(404).json({
                    message:'Usuario no encontrado'
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
            const { name, semester, hours } = req.body;
            if( !name || !semester || !hours){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }
            const subject = await Subject.create({ name, semester, hours})

            res.json({
                message:'success',
                data: subject
            })

        } catch (error) {
            console.error( error );
            res.status(500).json({
                message: 'Error al crear la materia'
            })
        }
    }
    async update(req, res) {
          try {
            const id = req.params.id;

            const { name, semester, hours, active, modalidad } = req.body;
            if( !name || !semester || !hours || !active || !modalidad){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            const subject = await Subject.findByIdAndUpdate(
                id, 
                { name, semester, hours, active, modalidad},
                { new: true }
            )

            res.json({
                message:'success',
                data: subject
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la materia'
            })
        }
    }
    async delete(req, res) {
          try {
            const id = req.params.id;

            const subject = await Subject.findByIdAndDelete(id);

            if( !subject){
                return  res.status(404).json({
                            message:'Materia no encontrada'            
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
