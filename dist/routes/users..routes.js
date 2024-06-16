"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/User/user.controller");
const celebrate_1 = require("celebrate");
const logIn_schema_1 = require("../controllers/schemas/logIn.schema");
const usersRoutes = express_1.default.Router();
usersRoutes.route("/sign-up").post(user_controller_1.signUpController);
usersRoutes.route("/log-in").post((0, celebrate_1.celebrate)({ body: logIn_schema_1.logInSchema }), user_controller_1.logInController);
exports.default = usersRoutes;
