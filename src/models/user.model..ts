import { Schema, model, Document, Model } from 'mongoose';
import { passwordRegex } from '../utils/regex';
import bcrypt from 'bcryptjs';

export enum Role {
  CLIENT = 'CLIENT',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN',
}

export interface UserModel extends Document {
  name: string;
  lastName: string;
  email: string;
  photo: string;
  password: string;
  active: boolean;
  role: string;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
}

const userSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  role: {
    type: String,
    enum: Object.values(Role), // Solo acepta los valores del enum
    required: [true, 'Role is required'],
  },
  photo: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (this: UserModel) {
        return passwordRegex.test(this.password);
      },
      message:
        'Password must include at least one special character, one lowercase letter, one uppercase letter, and be between 8 and 15 characters long',
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

userSchema.pre('save', async function (next) {
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = model<UserModel, Model<UserModel>>('User', userSchema);

export default User;
