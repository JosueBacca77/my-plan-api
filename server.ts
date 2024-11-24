const mongoose = require('mongoose');
const dotenv = require('dotenv');

import app from './src/app';
import redisClient from './src/redis/redis';

dotenv.config({ path: `${__dirname}/.env` });

const DB: string = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_USER_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');

  // Cerrar Redis de forma ordenada
  try {
    console.log('Closing Redis connection...');
    await redisClient.disconnect();
    console.log('Redis connection closed.');
  } catch (redisError) {
    console.error('Error closing Redis connection:', redisError);
  }

  // Cerrar el servidor
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0); // Finalizar el proceso
  });
});

// Express server
const port: number = Number(process.env.PORT);

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', async (error: Error) => {
  console.log('UNHANDLED REJECTION');
  console.log(error.name, error.message);

  // Cerrar Redis de forma ordenada antes de salir
  try {
    console.log('Closing Redis connection...');
    await redisClient.disconnect();
    console.log('Redis connection closed.');
  } catch (redisError) {
    console.error('Error closing Redis connection:', redisError);
  }

  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', async (error: Error) => {
  console.log('UNCAUGHT EXCEPTION');
  console.log(error.name, error.message);

  // Cerrar Redis de forma ordenada antes de salir
  try {
    console.log('Closing Redis connection...');
    await redisClient.disconnect();
    console.log('Redis connection closed.');
  } catch (redisError) {
    console.error('Error closing Redis connection:', redisError);
  }

  process.exit(1);
});
