import { Schema, model, Document } from "mongoose";

interface ClientModel extends Document {
  name: string;
  lastName: string;
  birthDate: Date;
  height: number;
  weight: number;
  conditions?: string[];
  user: {
    id: string;
    userName: string;
    email: string;
  };
  plans: string[];
}

const clientSchema = new Schema<ClientModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  user: {
    id: {
      type: String,
      required: [true, "User Id is required"],
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
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
