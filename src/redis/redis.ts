import { createClient } from 'redis';
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../.env` });

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

// Manejo de errores
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Conexión inicial
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully!');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    process.exit(1); // Salir si Redis no puede conectarse
  }
})();

export default redisClient;
