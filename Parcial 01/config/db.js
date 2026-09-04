import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        await mongoose.connect( MONGODB_URI  );
        console.log('Conexión con MongoDB Correcta 🙂');
    } catch (error) {
        console.error('Error al conectarse con mongoDB 😐');
        console.error(error);
        process.exit(1);
    }
} 

