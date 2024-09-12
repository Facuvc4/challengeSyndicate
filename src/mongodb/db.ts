import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || 'mongodb://localhost:27017/union'
    );
    console.log('Conexion a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Salir del proceso en caso de error
  }
};
