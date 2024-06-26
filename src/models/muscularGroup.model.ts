import { Schema, model, Document } from "mongoose";

interface MuscularGroupModel extends Document {
  name: string;
  description?: string;
}

const muscularGroupSchema = new Schema<MuscularGroupModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: String,
});

export const MuscularGroup = model<MuscularGroupModel>(
  "MuscularGroup",
  muscularGroupSchema
);