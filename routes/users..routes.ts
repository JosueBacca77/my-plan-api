import express from "express";
import { logInController, signUpController } from "../controllers/User/user.controller";
import { celebrate } from "celebrate";
import { logInSchema } from "../controllers/schemas/logIn.schema";

const usersRoutes = express.Router();

usersRoutes.route("/sign-up").post(signUpController);
usersRoutes.route("/log-in").post(celebrate({ body: logInSchema }), logInController);

export default usersRoutes;
