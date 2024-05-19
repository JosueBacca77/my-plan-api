import { Schema, model, Document } from "mongoose";
import { passwordRegex } from "../utils/regex";
import bcrypt from "bcryptjs";

export const CLIENT = "client";
export const TRAINER = "trainer";
export const ADMIN = "admin";

export type Role = Document & (typeof CLIENT | typeof TRAINER | typeof ADMIN);

export interface UserModel extends Document {
  name: string;
  lastName: string;
  email: string;
  photo: string;
  password: string;
  active: boolean;
  role: Role;
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
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  photo: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (this: UserModel) {
        console.log("A VER", this.password);
        console.log("VALOR", passwordRegex.test(this.password));
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

userSchema.pre("save", async function (next) {
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = model<UserModel>("User", userSchema);

export default User;
