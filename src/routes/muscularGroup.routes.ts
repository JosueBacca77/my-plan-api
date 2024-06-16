import express from "express";
import { celebrate } from "celebrate";
import {
  deleteMuscularGroup,
  getMuscularGroup,
  patchMuscularGroup,
  postMUscularGroup,
} from "../controllers/muscularGroup.controller";
import { newMuscularGroupSchema } from "../controllers/schemas/newMuscularGroup.schema";

const muscularGroupsRoutes = express.Router();

muscularGroupsRoutes
  .route("/")
  .post(celebrate({ body: newMuscularGroupSchema }), postMUscularGroup);

muscularGroupsRoutes
  .route("/:id")
  .get(getMuscularGroup)
  .patch(patchMuscularGroup)
  .delete(deleteMuscularGroup);

export default muscularGroupsRoutes;
