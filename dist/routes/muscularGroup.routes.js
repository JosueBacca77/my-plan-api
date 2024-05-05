"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const muscularGroupsRoutes = express_1.default.Router();
muscularGroupsRoutes
    .route("/")
    // .get(getAllMuscularGroups)
    .post((0, celebrate_1.celebrate)({ body: newMuscularGroupSchema }), postMUscularGroup);
muscularGroupsRoutes
    .route("/:id")
    .get(getMuscularGroup)
    .patch(patchMuscularGroup)
    .delete(deleteMuscularGroup);
exports.default = muscularGroupsRoutes;