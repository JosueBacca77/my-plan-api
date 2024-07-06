import { Schema, model, Document } from "mongoose";

export interface ClientModel {
  birthDate: Date;
  height: number;
  weight: number;
  conditions?: string[];
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    photo: string;
  };
  plans?: string[];
}

const clientSchema = new Schema<ClientModel>({
  user: {
    id: {
      type: String,
      required: [true, "User Id is required"],
    },
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
      required: [true, "User email is required"],
    },
    photo: {
      type: String,
      default: null,
    },
  },
  birthDate: {
    type: Date,
    required: [true, "Client birhtDate is required"],
  },
  height: {
    type: Number,
    required: [true, "Client height is required"],
  },
  weight: {
    type: Number,
    required: [true, "Client weight is required"],
  },
  conditions: {
    type: [String],
    default: null,
  },
});

const Client = model<ClientModel>("Client", clientSchema);

export default Client;
