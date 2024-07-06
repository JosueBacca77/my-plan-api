import { PlanExerciseInterface } from "../../../../models/plan.model";

interface SpecificRoutine {
    day: number;
    description: string;
}

interface MuscularGroup {
    name: string;
    description: string;
}

interface PlanExercise {
    day: string;
    series?: number;
    repetitions?: string;
    explanation?: string;
    metodology?: string;
}

interface MuscularGroupPlan {
    muscularGroup: MuscularGroup;
    exercises: PlanExercise[];
}

interface Target {
    id: string;
    name: string;
    color: string;
}

export interface NewPlan {
    client: string;
    startDate: Date;
    finishDate: Date;
    target: string;
    warmUp?: string;
    finalBlock?: string;
    specificRoutine?: SpecificRoutine[];
    planExercises?: PlanExerciseInterface[];
}