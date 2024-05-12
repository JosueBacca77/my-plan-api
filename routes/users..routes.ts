import express from "express";
import { celebrate } from "celebrate";
import { newUserSchema } from "../controllers/schemas/newUser.schema";
import { signup } from "../controllers/user.controller";

const usersRoutes = express.Router();

usersRoutes
  .route("/")
  // .get(getAllexercises)
  .post(celebrate({ body: newUserSchema }), signup);

export default usersRoutes;
