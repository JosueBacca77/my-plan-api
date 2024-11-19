import express from 'express';
import { checkAdminEndpoint } from '../middlewares/admin/admin.middlewares';
import { celebrate } from 'celebrate';
import { newAdminSchema } from '../controllers/schemas/admin.schema';
import { createAdmin } from '../controllers/admin.controller';

const adminRoutes = express.Router();

adminRoutes
  .route('/')
  .post(checkAdminEndpoint, celebrate({ body: newAdminSchema }), createAdmin);

export default adminRoutes;
