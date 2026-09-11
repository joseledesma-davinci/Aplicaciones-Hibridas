import Refugio from "../models/Refugio.js";

class RefugioController {
    async getAll( req, res) {
        try {
            const refugios = await Refugio.find();

            res.json({
                message:'success',
                data: refugios
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los refugios'
            })
        }
    }
    async getById( req, res) {
        try {
            const id = req.params.id;
            const refugio = await Refugio.findById( id );

            if( !refugio){
                return res.status(404).json({
                    message:'Refugio no encontrado'
                });
            }
            res.json({
                message:'success',
                data: refugio
            })

        } catch (error) {
            console.error( error);
            res.status(500).json({
                message: 'Error al obtener el refugio'
            })
        }
    }
    async create(req, res) {
          try {
            const { nombre, direccion, ciudad, telefono, email } = req.body;
            if( !nombre || !direccion || !ciudad || !telefono || !email){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }
            const refugio = await Refugio.create({ nombre, direccion, ciudad, telefono, email })

            res.json({
                message:'success',
                data: refugio
            })

        } catch (error) {
            console.error( error );
            res.status(500).json({
                message: 'Error al crear el refugio'
            })
        }
    }
    async update(req, res) {
          try {
            const id = req.params.id;

            const { nombre, direccion, ciudad, telefono, email } = req.body;
            if( !nombre || !direccion || !ciudad || !telefono || !email ){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            const refugio = await Refugio.findByIdAndUpdate(
                id, 
                { nombre, direccion, ciudad, telefono, email},
                { new: true }
            )

            res.json({
                message:'success',
                data: refugio
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar el refugio'
            })
        }
    }
    async delete(req, res) {
          try {
            const id = req.params.id;

            const refugio = await Refugio.findByIdAndDelete(id);
            // FALTA VALIDAR MASCOTAS EN REFUGIO
            if( !refugio){
                return  res.status(404).json({
                            message:'Refugio no encontrado'            
                        });
            }

            res.json({
                message:'success'
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar el refugio'
            })
        }
    }
}

export default RefugioController;