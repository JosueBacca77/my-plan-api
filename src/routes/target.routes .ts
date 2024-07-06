import express from "express";
import { celebrate } from "celebrate";
import { newTargetSchema } from "../controllers/schemas/newTarget.schema";
import { getTarget, postTarget } from "../controllers/target.controller ";

const targetsRoutes = express.Router();

targetsRoutes
  .route("/")
  .post(celebrate({ body: newTargetSchema }), postTarget);

targetsRoutes.route("/:id").get(getTarget);

export default targetsRoutes;
