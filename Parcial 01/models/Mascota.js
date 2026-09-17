import mongoose from 'mongoose';
const mascotaSchema = new mongoose.Schema({

    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
    },
    especie: {
      type: String,
      required: [true, 'La especie es obligatoria'],
      enum: ['perro', 'gato', 'otro'],
      lowercase: true,
      trim: true
    },
    raza: {
      type: String,
      default: 'Mestizo',
      trim: true
    },
    edad: {
      type: Number,
      required: [true, 'La edad es obligatoria (en años)'],
      min: [0, 'La edad no puede ser negativa']
    },
    tamano: {
      type: String,
      required: [true, 'El tamaño es obligatorio'],
      enum: ['pequeño', 'mediano', 'grande'],
      lowercase: true
    },
    sexo: {
      type: String,
      required: [true, 'El sexo es obligatorio'],
      enum: ['macho', 'hembra'],
      lowercase: true
    },
    descripcion: {
      type: String,
      // required: [true, 'La descripción es obligatoria'],
      trim: true
    },
    // imagenUrl: {
    //   type: String,
    //   default: 'https://placehold.co/400x300?text=Mascota'
    // },
    estado: {
      type: String,
      enum: ['disponible', 'en proceso', 'adoptado'],
      default: 'disponible',
      lowercase: true
    },
    refugio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'refugio',
      required: [true, 'El refugio es obligatorio']
    }
})

const Mascota = mongoose.model('mascota', mascotaSchema);
export default Mascota