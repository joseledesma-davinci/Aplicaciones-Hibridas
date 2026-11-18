import Mascota from '../models/Mascota.js';
import Refugio from '../models/Refugio.js';

class MascotaController {
    async getAll( req, res) {
        try {
            const { especie, tamano, estado, refugio } = req.query;
            const filtro = {};

            if (especie) {
                filtro.especie = especie.toLowerCase();
            }
            if (tamano) {
                filtro.tamano = tamano.toLowerCase();
            }
            if (estado) {
                filtro.estado = estado.toLowerCase();
            }
            if (refugio) {
                filtro.refugio = refugio;
            }

            const mascotas = await Mascota.find(filtro).populate('refugio');

            res.json({
                message:'success',
                data: mascotas
            })

        } catch (error) {
            console.error( error);
            res.status(500).json({
                message: 'Error al obtener las mascotas'
            })
        }
    }
    async getById( req, res) {
        try {
            const id = req.params.id;
            const mascota = await Mascota.findById( id ).populate('refugio');

            if( !mascota){
                return res.status(404).json({
                    message:'Mascota no encontrada'
                });
            }
            res.json({
                message:'success',
                data: mascota
            })

        } catch (error) {
            console.error( error);
            res.status(500).json({
                message: 'Error al obtener la mascota'
            })
        }
    }
    async create(req, res) {
          try {
            const { nombre, especie, edad, tamano, sexo, refugio } = req.body;
            if( !nombre || !especie || !edad || !tamano || !sexo || !refugio){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            const refugioExists = await Refugio.findById( refugio );
            
            if( !refugioExists){
                return res.status(404).json({
                    message: 'El refugio no existe'
                });
            }

            const mascota = await Mascota.create({ nombre, especie, edad, tamano, sexo, refugio })

            res.json({
                message:'success',
                data: mascota
            })

        } catch (error) {
            console.error( error );
            res.status(500).json({
                message: 'Error al crear la mascota'
            })
        }
    }
    async update(req, res) {
          try {
            const id = req.params.id;

            const { nombre, especie, raza, edad, tamano, sexo, estado, refugio } = req.body;
            if( !nombre || !especie || !raza || !edad || !tamano || !sexo || !estado || !refugio ){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            const mascota = await Mascota.findByIdAndUpdate(
                id, 
                { nombre, especie, raza, edad, tamano, sexo, estado, refugio},
                { new: true }
            )

            res.json({
                message:'success',
                data: mascota
            })

        } catch (error) {
            console.error( error );
            res.status(500).json({
                message: 'Error al actualizar la mascota'
            })
        }
    }
    async delete(req, res) {
          try {
            const id = req.params.id;

            const mascota = await Mascota.findByIdAndDelete(id);
            
            if( !mascota){
                return  res.status(404).json({
                            message:'Mascota no encontrada'            
                        });
            }

            res.json({
                message:'success'
            })

        } catch (error) {
            console.error( error );
            res.status(500).json({
                message: 'Error al eliminar la mascota'
            })
        }
    }
} 

export default MascotaController;