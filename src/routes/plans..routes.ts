import express from "express";
import { protect } from "../services/Auth/auth.service";
import { createPlanController } from "../controllers/plan.controller";

const plansRoutes = express.Router();

plansRoutes.route("/").post(protect, createPlanController);

export default plansRoutes;
