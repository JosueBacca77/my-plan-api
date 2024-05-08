"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const muscularGroup_controller_1 = require("../controllers/muscularGroup.controller");
const newMuscularGroup_schema_1 = require("../controllers/schemas/newMuscularGroup.schema");
const muscularGroupsRoutes = express_1.default.Router();
muscularGroupsRoutes
    .route("/")
    // .get(getAllMuscularGroups)
    .post((0, celebrate_1.celebrate)({ body: newMuscularGroup_schema_1.newMuscularGroupSchema }), muscularGroup_controller_1.postMUscularGroup);
muscularGroupsRoutes
    .route("/:id")
    .get(muscularGroup_controller_1.getMuscularGroup)
    .patch(muscularGroup_controller_1.patchMuscularGroup)
    .delete(muscularGroup_controller_1.deleteMuscularGroup);
exports.default = muscularGroupsRoutes;
