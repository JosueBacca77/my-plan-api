"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRoutes = express_1.default.Router();
adminRoutes.route('/').post(() => console.log('LLEGA ENDPOINT'));
// .post(checkAdminEndpoint, celebrate({ body: newAdminSchema }), createAdmin);
exports.default = adminRoutes;
