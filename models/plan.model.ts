import { Schema, model, Document } from "mongoose";

interface SpecificRoutineInterface {
  description: string;
  day: string;
}

interface TrainerInterface {
  id: string;
  name: string;
  userName: string;
  email: string;
}

interface ClientInterface {
  id: string;
  name: string;
  userName: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  conditions: string[];
}

interface TargetInterface {
  name: string;
  description?: string;
  color: string;
}

interface MuscularGroupInterface {
  name: string;
  description?: string;
}

interface ExerciseInterface {
  name: string;
  description?: string;
  files: string[];
}

interface ExerciseCombinationInterface {
  description: string;
  exercises: ExerciseInterface[];
}

interface PlanExerciseInterface {
  exercise: ExerciseInterface;
  day: string;
  series?: number;
  repetitions?: string;
  explanation: string;
  metodology?: string; //it's for be used insstead of series and repetitions
  combination?: ExerciseCombinationInterface;
}

interface PlanMuscularGroupInterface {
  muscularGroup: MuscularGroupInterface;
  exercises: PlanExerciseInterface[];
}

interface PlanModel extends Document {
  startDate: Date;
  finishDate: Date;
  warmUp?: string;
  finalBlock?: string;
  specificRoutine?: SpecificRoutineInterface[];
  trainer: TrainerInterface;
  client: ClientInterface;
  target: TargetInterface;
  goups: PlanMuscularGroupInterface[];
}

const planSchema = new Schema<PlanModel>({
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  finishDate: {
    type: Date,
    required: [true, "Finish date is required"],
  },
  warmUp: String,
  finalBlock: String,
  specificRoutine: [
    {
      description: String,
      day: String,
    },
  ],
  trainer: {
    id: {
      type: String,
      required: [true, "Trainer Id is required"],
    },
    name: {
      type: String,
      required: [true, "Trainer name is required"],
    },
    userName: {
      type: String,
      required: [true, "Trainer user name is required"],
    },
    email: {
      type: String,
      required: [true, "Trainer email is required"],
    },
  },
});

const Plan = model<PlanModel>("Plan", planSchema);

export default Plan;
