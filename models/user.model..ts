import { Schema, model, Document } from "mongoose";
import { passwordRegex } from "../utils/regex";

interface UserModel extends Document {
  name: string;
  lastName: string;
  email: string;
  photo: string;
  password: string;
  passwordConfirm: string;
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
  passwordConfirm: {
    type: String,
    required: [true, "Password confirm is required"],
    validate: [
      {
        //this only work on CREATE and SAVE!!
        validator: function () {
          return this.password === this.passwordConfirm;
        },
        message: "Passwords don't not match",
      },
      {
        validator: function () {
          return this.password.match(passwordRegex);
        },
        message:
          "Password must include at least one special character, one lowercase letter, one uppercase letter, and be between 8 and 15 characters long",
      },
    ],
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

const User = model<UserModel>("User", userSchema);

export default User;
