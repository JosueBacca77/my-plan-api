import { Schema, model, Document } from "mongoose";

interface TrainerModel extends Document {
  name: string;
  lastName: string;
  hiredDate: Date;
  birthDate: Date;
  user: {
    id: string;
    userName: string;
    email: string;
  };
}

const trainerSchema = new Schema<TrainerModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  hiredDate: {
    type: Date,
    default: Date.now,
  },
  birthDate: {
    type: Date,
    required: [true, "Trainer birth is required"],
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
});

const Trainer = model<TrainerModel>("Trainer", trainerSchema);

export default Trainer;
