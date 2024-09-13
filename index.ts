import express from 'express';
import router from './src/routers/index.router';
import { connectDB } from './src/mongodb/db';
import errorController from './src/controllers/error/index.controller';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const swaggerJsdoc = require('./swaggerJson/openapi.json');

const startServer = async () => {
  await connectDB();
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
  app.use(router);
  app.use(errorController);
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(
      `Documentación de la API disponible en http://localhost:${PORT}/api-docs`
    );
  });
};

startServer().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
});
