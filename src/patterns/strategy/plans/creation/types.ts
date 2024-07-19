import { Types } from "mongoose";

interface SpecificRoutine {
    day: string;
    description: string;
}

export interface NewPlanExerciseInterface {
    exercise: Types.ObjectId;
    day: string;
    series?: number;
    repetitions?: string;
    explanation: string;
    metodology?: string; //it's for be used insstead of series and repetitions
    // combination?: ExerciseCombinationInterface;
  }
  

export interface NewPlan {
    client: string;
    startDate: Date;
    finishDate: Date;
    target: string;
    warmUp?: string;
    finalBlock?: string;
    specificRoutine?: SpecificRoutine[];
    planExercises?: NewPlanExerciseInterface[];
}