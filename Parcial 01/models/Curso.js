import mongoose from 'mongoose';
const categoriaSchema = new mongoose.Schema({

    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Categoria = mongoose.model('categoria', categoriaSchema);
export default Categoria