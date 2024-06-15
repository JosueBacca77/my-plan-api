import express from "express";
import { signUpController } from "../controllers/user.controller";

const usersRoutes = express.Router();

usersRoutes.route("/sign-up").post(signUpController);

export default usersRoutes;
