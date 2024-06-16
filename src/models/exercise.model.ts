import { Schema, model, Document, Types } from "mongoose";

interface ExerciseModel extends Document {
  name: string;
  description?: string;
  files?: string[];
  muscularGroup: Types.ObjectId;
}

const exerciseSchema = new Schema<ExerciseModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: String,
  files: {
    type: [String],
    default: null,
  },
  muscularGroup: {
    type: Schema.Types.ObjectId,
    ref: "MuscularGroup",
  },
});

const Exercise = model<ExerciseModel>("Exercise", exerciseSchema);

export default Exercise;
