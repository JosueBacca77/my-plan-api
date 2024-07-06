import { Schema, model, Document } from "mongoose";

export interface TargetModel extends Document {
  name: string;
  description?: string;
  color: string;
}

const targetSchema = new Schema<TargetModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: String,
  color: {
    type: String,
    required: [true, "Color is required"],
  },
});

export const Target = model<TargetModel>(
  "Target",
  targetSchema
);