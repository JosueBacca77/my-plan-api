import { Schema, Types, model } from 'mongoose';

interface SpecificRoutineInterface {
  description: string;
  day: string;
}

interface TrainerInterface {
  id: string;
  name: string;
  lastName: string;
  userName?: string;
  email: string;
}

interface ClientInterface {
  id: string;
  name: string;
  userName?: string;
  lastName: string;
  email: string;
  birthDate: Date;
  height: number;
  weight: number;
  conditions?: string[];
}

interface TargetInterface {
  id: string;
  name: string;
  description?: string;
  color: string;
}

const targetSchema = new Schema<TargetInterface>({
  name: {
    type: String,
    required: [true, 'Target name is required'],
  },
  description: String,
  color: String,
});

interface MuscularGroupInterface {
  id: Types.ObjectId;
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

export interface PlanExerciseInterface {
  exercise: ExerciseInterface;
  day: string;
  series?: number;
  repetitions?: string;
  explanation: string;
  metodology?: string; //it's for be used instead of series and repetitions
  combination?: ExerciseCombinationInterface;
}

export interface PlanMuscularGroupInterface {
  muscularGroup: MuscularGroupInterface;
  exercises: PlanExerciseInterface[];
}

export interface PlanModel {
  startDate: Date;
  finishDate: Date;
  warmUp?: string;
  finalBlock?: string;
  specificRoutine?: SpecificRoutineInterface[];
  trainer: TrainerInterface;
  client: ClientInterface;
  target: TargetInterface;
  muscularGroups?: PlanMuscularGroupInterface[];
  active?: boolean;
}

const muscularGroupSchema = new Schema<MuscularGroupInterface>({
  name: {
    type: String,
    required: [true, 'Muscular group name is required'],
  },
  description: String,
});

const exerciseSchema = new Schema<ExerciseInterface>({
  name: {
    type: String,
    required: [true, 'Plan exercise name is required'],
  },
  description: String,
  files: [String],
});

const clientSchema = new Schema<ClientInterface>({
  id: String,
  name: String,
  userName: String,
  lastName: String,
  email: String,
  birthDate: Date,
  height: Number,
  weight: Number,
  conditions: [String],
});

const exerciseCombinationSchema = new Schema<ExerciseCombinationInterface>({
  description: String,
  exercises: [exerciseSchema],
});

const planExercisesSchema = new Schema<PlanExerciseInterface>({
  exercise: {
    type: exerciseSchema,
    required: [true, 'Plan exercise must have an exercise data'],
  },
  day: {
    type: String,
    required: [true, 'Plan exercise must have a day'],
  },
  series: String,
  repetitions: String,
  explanation: String,
  metodology: String, //it's for be used insstead of series and repetitions
  combination: exerciseCombinationSchema,
});

const planMuscularGroupSchema = new Schema<PlanMuscularGroupInterface>({
  muscularGroup: {
    type: muscularGroupSchema,
    required: [true, 'Plan muscular group must have a muscular group data'],
  },
  exercises: {
    type: [planExercisesSchema],
    required: [true, 'Plan muscular group mus have exercises'],
  },
});

const planSchema = new Schema<PlanModel>({
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  finishDate: {
    type: Date,
    required: [true, 'Finish date is required'],
  },
  warmUp: String,
  finalBlock: String,
  target: {
    type: targetSchema,
    required: [true, 'Target plan is required'],
  },
  trainer: {
    type: {
      id: {
        type: String,
        required: [true, 'Trainer Id is required'],
      },
      name: {
        type: String,
        required: [true, 'Trainer name is required'],
      },
      lastName: {
        type: String,
        required: [true, 'Trainer name is required'],
      },
      // userName: {
      //   type: String,
      //   required: [true, "Trainer user name is required"],
      // },
      email: {
        type: String,
        required: [true, 'Trainer email is required'],
      },
    },
    required: [true, 'Plan must have a trainer data'],
  },
  specificRoutine: [
    {
      description: String,
      day: String,
    },
  ],
  client: {
    type: clientSchema,
  },
  active: {
    type: Boolean,
    default: false,
  },
  muscularGroups: {
    type: [planMuscularGroupSchema],
  },
});

export const Plan = model<PlanModel>('Plan', planSchema);
