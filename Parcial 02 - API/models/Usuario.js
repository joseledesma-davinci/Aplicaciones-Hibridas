import mongoose from "mongoose";
const UsuarioSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Usuario = mongoose.model('usuario', UsuarioSchema);
export default Usuario