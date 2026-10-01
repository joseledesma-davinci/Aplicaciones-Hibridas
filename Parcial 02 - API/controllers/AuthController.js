import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Usuario from "../models/Usuario.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
    async register( req, res) {
        try {
            const { nombre, email, password } = req.body;

            if( !nombre || !email || !password){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            // Verificar que el usuario no este registrado
            const exists = await Usuario.findOne( { email: email});
            if( exists) {
                return res.status(400).json({
                    message: 'El usuario ya existe',
                    data: {}
                })
            } 

            const hashedPassword = await bcrypt.hash( password, 10 );
            const newUser = await Usuario.create({
                nombre,
                email,
                password: hashedPassword
            })
            
            const data = {
                id: newUser._id,
                email: newUser.email
            }

            res.status(201).json({
                message: 'success',
                data
            })


        } catch (error) {
            console.log( error);
            return res.status(500).json({
                    message: error.message
                })
        }
    }
    async login( req, res) {
        try {
            const { email, password } = req.body;

            if( !email || !password){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            // Verificar que el email exista
            const user = await Usuario.findOne( { email });
            if( !user) {
                return res.status(401).json({
                    message: 'Credenciales Invalidas'
                })
            } 

            const isValid = await bcrypt.compare( password, user.password );

            if( !isValid){
                return res.status(401).json({
                    message: 'Credenciales Invalidas'
                })
            }
            // Agregamos el role en los datos visibles
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.rol
            }

            // Luego generamos el Token
            const token = jwt.sign( 
                payload, 
                SECRET_KEY, 
                { expiresIn: '1h'}
            );

            res.json({
                message: 'Credenciales Correctas!',
                token
            })

        } catch (error) {
            console.log( error);
            return res.status(500).json({
                    message: error.message
                })
        }

    }


}

export default AuthController;