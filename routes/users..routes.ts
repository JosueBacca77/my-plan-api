import express from "express";
import { signup } from "../controllers/user.controller";

const usersRoutes = express.Router();

usersRoutes.route("/sign-up").post(signup);

export default usersRoutes;
