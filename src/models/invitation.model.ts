import { Schema, model, Document } from 'mongoose';
import { Role } from './user.model.';

interface InvitationModel extends Document {
  token: string;
  email?: string;
  phone?: string;
  role: Role; // Role se mantiene como el tipo en TypeScript
  name: string;
  lastName: string;
  createdAt: Date;
  tokenExpires: Date;
  isUsed: boolean;
}

const invitationSchema = new Schema<InvitationModel>({
  token: {
    type: String,
    required: [true, 'Token is required'],
    select: false,
  },
  email: String,
  phone: String,
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: Object.values(Role), // Aquí defines los valores permitidos a partir del enum
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokenExpires: {
    type: Date,
    default: () => Date.now() + 30 * 60 * 1000,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

export const Invitation = model<InvitationModel>(
  'Invitation',
  invitationSchema
);
