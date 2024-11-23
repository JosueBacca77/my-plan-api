"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const plan_controller_1 = require("../controllers/plan.controller");
const auth_middlewares_1 = require("../middlewares/auth/auth.middlewares");
const plansRoutes = express_1.default.Router();
plansRoutes.route('/').post(plan_controller_1.createPlanController);
plansRoutes.route('/my-current').get(auth_middlewares_1.isClient, plan_controller_1.getMyCurrentPlanController);
plansRoutes
    .route('/my-current/:id')
    .patch(auth_middlewares_1.isClient, plan_controller_1.setMyCurrentPlanController);
// plansRoutes.route("/client").get(protect);
exports.default = plansRoutes;
