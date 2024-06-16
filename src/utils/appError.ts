class AppError extends Error {
  statusCode: number;
  code: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.code = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
