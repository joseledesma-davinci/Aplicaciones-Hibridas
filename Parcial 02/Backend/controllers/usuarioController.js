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
                    data: {}
                });
            }
            res.json({
                message:'success',
                data: usuario
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

            const { nombre, email, password, rol } = req.body;
            if( !nombre || !email ){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }
            const data = {
                nombre,
                email
            }
            if( password){
                data.password  = await bcrypt.hash( password, 10);
            }
            
            if( rol){
                data.rol = rol;
            }
            //const passwordHash = await bcrypt.hash( password, 10);
            const usuario = await Usuario.findByIdAndUpdate(id, data)
            usuario.save()

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

    async uploadProfileImage( req, res) {
            try {
                // Verificamos si no se paso una archivo
                if( !req.file){
                    return res.status(400).json({
                        message: `No se envio el archivo`
                    })
                }
                // Construimos la ruta pública
                const imagePath = `/uploads/profiles/${req.file.filename}`;
                // Identificamos al usuario por su id que obtenemos del JWT
                const id = req.user.id;
                // Actualizamos el usuario con la ruta de la imagen
                const user = await Usuario.findByIdAndUpdate(
                    id, 
                    {profileImage: imagePath}, 
                    { new: true}
                ).select('_id name email profileImage');
                // Si no se actualizo el usuario porque no se encotro
                if(!user){
                    return res.status(404).json({
                        message: 'Usuario no econtrado'
                    })
                }
    
                return res.status(200).json({
                    message: 'Imagen actualizada', 
                    data: user 
                });
                
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    message: `Error del servidor, al actualizar la foto del usuario`
                })
            }
        }
    
        async getMe(req, res) {
            try {
                const id = req.user.id;
                const user = await Usuario.findById(id).select('-password');
    
                if( !user){
                    return res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                }
    
                res.status(200).json({
                    message: 'success',
                    data: user
                })
    
            } catch (error) {
                console.error( error);
                res.status(500).json({
                    message: "Error al obentener el Perfil"
                })
            }
        }
}

export default UsuarioController;
