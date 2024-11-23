import express from 'express';
import {
  createPlanController,
  getMyCurrentPlanController,
  setMyCurrentPlanController,
} from '../controllers/plan.controller';
import { isClient } from '../middlewares/auth/auth.middlewares';

const plansRoutes = express.Router();

plansRoutes.route('/').post(createPlanController);

plansRoutes.route('/my-current').get(isClient, getMyCurrentPlanController);
plansRoutes
  .route('/my-current/:id')
  .patch(isClient, setMyCurrentPlanController);

// plansRoutes.route("/client").get(protect);

export default plansRoutes;
