import express from "express";
import { celebrate } from "celebrate";
import {
  createInvitationController,
  getInvitationController,
} from "../controllers/invitation.controler";
import { newInvitationSchema } from "../controllers/schemas/newInvitation.schema";

const invitationsRoutes = express.Router();

invitationsRoutes
  .route("/")
  // .get(getAllexercises)
  .get()
  .post(celebrate({ body: newInvitationSchema }), createInvitationController);

invitationsRoutes.route("/:id").get(getInvitationController);
export default invitationsRoutes;
