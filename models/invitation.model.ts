import { Schema, model, Document } from "mongoose";
import { Rol } from "./user.model.";
import crypto from "crypto";

interface InvitationModel extends Document {
  token: string;
  email?: string;
  phone?: string;
  rol: Rol;
  name: string;
  lastName: string;
  createdAt: Date;
  tokenExpires: Date;
}

const invitationSchema = new Schema<InvitationModel>({
  token: {
    type: String,
    // required: [true, "Token is required"],
    select: false,
  },
  email: String,
  phone: String,
  rol: {
    type: String,
    required: [true, "Rol is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokenExpires: Date,
});

invitationSchema.index({ email: 1 }, { unique: true });

invitationSchema.pre("save", async function (next) {
  if (this.token) next();

  //create a token
  const token = crypto.randomBytes(32).toString("hex");

  //We shouldn't save this plain text token in DB
  //hash the token
  this.token = crypto.createHash("sha256").update(token).digest("hex");
  //set expire

  this.tokenExpires = new Date(Date.now() + 30 * 60 * 1000); //expires 30 minutes after creation
  next();
});

export const Invitation = model<InvitationModel>(
  "Invitation",
  invitationSchema
);
