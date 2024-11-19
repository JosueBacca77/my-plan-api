"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_middlewares_1 = require("../middlewares/admin/admin.middlewares");
const celebrate_1 = require("celebrate");
const admin_schema_1 = require("../controllers/schemas/admin.schema");
const admin_controller_1 = require("../controllers/admin.controller");
const adminRoutes = express_1.default.Router();
adminRoutes
    .route('/')
    .post(admin_middlewares_1.checkAdminEndpoint, (0, celebrate_1.celebrate)({ body: admin_schema_1.newAdminSchema }), admin_controller_1.createAdmin);
exports.default = adminRoutes;
