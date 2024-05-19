import { Schema, model, Document } from "mongoose";

interface TrainerModel extends Document {
  hiredDate?: Date;
  birthDate: Date;
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    photo: string;
  };
}

const trainerSchema = new Schema<TrainerModel>({
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
});

const Trainer = model<TrainerModel>("Trainer", trainerSchema);

export default Trainer;
