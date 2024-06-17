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
  muscularGroups: PlanMuscularGroupInterface[];
}

const muscularGroupSchema = new Schema<MuscularGroupInterface>({
  name: {
    type: String,
    required: [true, 'Muscular group name is required']
  },
  description: String
})

const exerciseSchema = new Schema<ExerciseInterface>({
  name: {
    type: String,
    required: [true, 'Plan exercise name is required']
  },
  description: String,
  files: [String]
})

const exerciseCombinationSchema = new Schema<ExerciseCombinationInterface>({
  description: String,
  exercises: [exerciseSchema]
})

const planExercisesSchema = new Schema<PlanExerciseInterface>({
  exercise: {
    type: exerciseSchema,
    required: [true, 'Plan exercise must have an exercise data']
  },
  day: {
    type: String,
    required: [true, 'Plan exercise must have a day']
  },
  series: String,
  repetitions: String,
  explanation: String,
  metodology: String, //it's for be used insstead of series and repetitions
  combination: exerciseCombinationSchema
})

const planMuscularGroupSchema = new Schema<PlanMuscularGroupInterface>({
  muscularGroup: {
    type: muscularGroupSchema,
    required: [true, 'Plan muscular group must have a muscular group data']
  },
  exercises: {
    type: [planExercisesSchema],
    required: [true, 'Plan muscular group mus have exercises']
  }
})

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
  trainer: {
    type: {
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
    required:[true, 'Plan must have a trainer data']
  },
  specificRoutine: [
    {
      description: String,
      day: String,
    },
  ],
  muscularGroups: {
    type: [planMuscularGroupSchema]
  }
});

const Plan = model<PlanModel>("Plan", planSchema);

export default Plan;
