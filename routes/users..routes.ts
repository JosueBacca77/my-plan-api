import express from "express";
import { celebrate } from "celebrate";
import { newRoleUserSchema } from "../controllers/schemas/newUser.schema";
import { signup } from "../controllers/user.controller";

const usersRoutes = express.Router();

usersRoutes
  .route("/sign-up")
  // .get(getAllexercises)
  .post(celebrate({ body: newRoleUserSchema }), signup);

export default usersRoutes;
