"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const newTarget_schema_1 = require("../controllers/schemas/newTarget.schema");
const target_controller_1 = require("../controllers/target.controller ");
const targetsRoutes = express_1.default.Router();
targetsRoutes
    .route("/")
    .post((0, celebrate_1.celebrate)({ body: newTarget_schema_1.newTargetSchema }), target_controller_1.postTarget);
targetsRoutes.route("/:id").get(target_controller_1.getTarget);
exports.default = targetsRoutes;
