"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const newExercise_schema_1 = require("../controllers/schemas/newExercise.schema");
const exercise_controller_1 = require("../controllers/exercise.controller");
const exercisesRoutes = express_1.default.Router();
exercisesRoutes
    .route("/")
    // .get(getAllexercises)
    .post((0, celebrate_1.celebrate)({ body: newExercise_schema_1.newExerciseSchema }), exercise_controller_1.postExercise);
exercisesRoutes
    .route("/:id")
    .get(exercise_controller_1.getExercise)
    .patch(exercise_controller_1.patchExercise)
    .delete(exercise_controller_1.deleteExercise);
exports.default = exercisesRoutes;
