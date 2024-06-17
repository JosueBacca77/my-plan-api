import express from "express";

const plansRoutes = express.Router();

plansRoutes.route("/").post();

export default plansRoutes;
