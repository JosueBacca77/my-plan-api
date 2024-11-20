import express from 'express';
import { celebrate } from 'celebrate';
import {
  createInvitationController,
  getInvitationController,
} from '../controllers/invitation.controler';
import { newInvitationSchema } from '../controllers/schemas/newInvitation.schema';
import { protectAdmin } from '../services/Auth/auth.service';

const invitationsRoutes = express.Router();

invitationsRoutes.use(protectAdmin);

invitationsRoutes
  .route('/')
  .post(celebrate({ body: newInvitationSchema }), createInvitationController);

invitationsRoutes.route('/:id').get(getInvitationController);
export default invitationsRoutes;
