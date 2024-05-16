import { Schema, model, Document } from "mongoose";
import { passwordRegex } from "../utils/regex";

export const CLIENT = "client";
export const TRAINER = "trainer";
export const ADMIN = "admin";

export type Rol = typeof CLIENT | typeof TRAINER | typeof ADMIN;

export interface UserModel extends Document {
  name: string;
  lastName: string;
  email: string;
  photo: string;
  password: string;
  active: boolean;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
}

const userSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  photo: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function () {
        return passwordRegex.test(this.password);
      },
      message:
        "Password must include at least one special character, one lowercase letter, one uppercase letter, and be between 8 and 15 characters long",
    },
    select: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

const User = model<UserModel>("User", userSchema);

export default User;
