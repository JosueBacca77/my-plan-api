"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const newUser_schema_1 = require("../controllers/schemas/newUser.schema");
const user_controller_1 = require("../controllers/user.controller");
const usersRoutes = express_1.default.Router();
usersRoutes
    .route("/")
    // .get(getAllexercises)
    .post((0, celebrate_1.celebrate)({ body: newUser_schema_1.newUserSchema }), user_controller_1.signup);
exports.default = usersRoutes;
