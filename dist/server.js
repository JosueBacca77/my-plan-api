"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app_1 = __importDefault(require("./src/app"));
const redis_1 = __importDefault(require("./src/redis/redis"));
dotenv.config({ path: `${__dirname}/.env` });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_USER_PASSWORD);
mongoose
    .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('DB connection successful!');
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('SIGINT received. Shutting down gracefully...');
    // Cerrar Redis de forma ordenada
    try {
        console.log('Closing Redis connection...');
        yield redis_1.default.disconnect();
        console.log('Redis connection closed.');
    }
    catch (redisError) {
        console.error('Error closing Redis connection:', redisError);
    }
    // Cerrar el servidor
    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0); // Finalizar el proceso
    });
}));
// Express server
const port = Number(process.env.PORT);
const server = app_1.default.listen(port, () => {
    console.log(`App running on port ${port}`);
});
process.on('unhandledRejection', (error) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('UNHANDLED REJECTION');
    console.log(error.name, error.message);
    // Cerrar Redis de forma ordenada antes de salir
    try {
        console.log('Closing Redis connection...');
        yield redis_1.default.disconnect();
        console.log('Redis connection closed.');
    }
    catch (redisError) {
        console.error('Error closing Redis connection:', redisError);
    }
    server.close(() => {
        process.exit(1);
    });
}));
process.on('uncaughtException', (error) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('UNCAUGHT EXCEPTION');
    console.log(error.name, error.message);
    // Cerrar Redis de forma ordenada antes de salir
    try {
        console.log('Closing Redis connection...');
        yield redis_1.default.disconnect();
        console.log('Redis connection closed.');
    }
    catch (redisError) {
        console.error('Error closing Redis connection:', redisError);
    }
    process.exit(1);
}));
