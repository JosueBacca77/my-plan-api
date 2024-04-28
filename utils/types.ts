// Interfaz de errores de validación de campos de Mongo
interface MongoValidationError {
  errors: { [key: string]: { message: string } };
}

export interface AppErrorInterface extends Error, MongoValidationError {
  statusCode: number;
  code: number;
  status: string;
  isOperational: boolean;
  message: string;
}
