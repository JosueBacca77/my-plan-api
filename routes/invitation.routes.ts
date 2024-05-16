import express from "express";
import { celebrate } from "celebrate";
import {
  createInvitation,
  getInvitation,
} from "../controllers/invitation.controler";
import { newInvitationSchema } from "../controllers/schemas/newInvitation.schema";

const invitationsRoutes = express.Router();

invitationsRoutes
  .route("/")
  // .get(getAllexercises)
  .get()
  .post(celebrate({ body: newInvitationSchema }), createInvitation);

invitationsRoutes.route("/:id").get(getInvitation);
export default invitationsRoutes;
