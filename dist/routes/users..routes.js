"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const usersRoutes = express_1.default.Router();
usersRoutes.route("/sign-up").post(user_controller_1.signup);
exports.default = usersRoutes;
