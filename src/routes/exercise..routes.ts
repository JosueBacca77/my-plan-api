import express from "express";
import { celebrate } from "celebrate";

import { newExerciseSchema } from "../controllers/schemas/newExercise.schema";
import {
  deleteExercise,
  getExercise,
  patchExercise,
  postExercise,
} from "../controllers/exercise.controller";

const exercisesRoutes = express.Router();

exercisesRoutes
  .route("/")
  // .get(getAllexercises)
  .post(celebrate({ body: newExerciseSchema }), postExercise);

exercisesRoutes
  .route("/:id")
  .get(getExercise)
  .patch(patchExercise)
  .delete(deleteExercise);

export default exercisesRoutes;
