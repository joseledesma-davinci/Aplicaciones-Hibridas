import mongoose from 'mongoose';
const refugioSchema = new mongoose.Schema({

    nombre: {
      type: String,
      required: [true, 'El nombre del refugio es obligatorio'],
      unique: true,
      trim: true
    },
    direccion: {
      type: String,
      required: [true, 'La dirección es obligatoria'],
      trim: true
    },
    ciudad: {
      type: String,
      required: [true, 'La ciudad es obligatoria'],
      trim: true
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    }
})

const Refugio = mongoose.model('refugio', refugioSchema);
export default Refugio