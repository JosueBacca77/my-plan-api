"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app_1 = __importDefault(require("./src/app"));
process.on("uncaughtException", (error) => {
    console.log("UNCAUGHT EXCEPTION");
    console.log(error.name, error.message);
    process.exit(1);
});
dotenv.config({ path: `${__dirname}/.env` });
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_USER_PASSWORD);
mongoose
    .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("DB connection successful!");
});
const port = Number(process.env.PORT);
const server = app_1.default.listen(port, () => {
    console.log(`App running on port ${port}`);
});
process.on("unhandledRejection", (error) => {
    console.log("UNHANDLED REJECTION");
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});
