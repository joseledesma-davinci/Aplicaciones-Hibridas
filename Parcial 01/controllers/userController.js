import bcrypt from 'bcrypt';

// Importa el Modelo
import Users from "../models/userModel.js";



const getUsers = async (req, res) => {
    const data = await Users.find();
    res.json( {message: 'success', data: data });
};
const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await Users.findById(id);
    if( !user){
        res.status(404).json({ message: 'Not Found', data: {}});
        return;
    }
    res.status(200).json( {message: 'success', data: user });
};
const postUser = async (req, res) => {
    const { body } = req;
    const { name, email, password} = body;

    if( !name || !email || !password){
        return res.status(403).send('Faltan Parametros Obligatorios');
    }

    // Hasheamos la contrasña y esparamos
    const passwordHash = await bcrypt.hash( password, 10);
    const newUser = new Users({
        name,
        email,
        password: passwordHash
    });


    newUser.save();
    const id = newUser._id;
    res.send(` Usuario Registrado con el ID ${id} `);
};
const updateUserById = async ( req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { name, email, password} = body;

    if( !name || !email || !password){
        return res.status(403).send('Faltan Parametros Obligatorios');
    }
    const passwordHash = await bcrypt.hash( password, 10);

    const data = {
        name,
        email,
        password: passwordHash
    }
    const user = await Users.findByIdAndUpdate(id, data );
    user.save()
    res.status(200).json( {message: 'success', data: {} });

}
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const status = await Users.findByIdAndDelete( id);
    if( status == 'Not Found'){
        res.status(404).json({ message: 'Not Found', data: {}});
        return;
    }
    res.status(200).json( {message: 'success', data: {} });
};

export { getUsers, getUserById, postUser, deleteUser};