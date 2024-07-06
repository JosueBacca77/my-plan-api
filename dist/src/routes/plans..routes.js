"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../services/Auth/auth.service");
const plan_controller_1 = require("../controllers/plan.controller");
const plansRoutes = express_1.default.Router();
plansRoutes.route("/").post(auth_service_1.protect, plan_controller_1.createPlanController);
exports.default = plansRoutes;
