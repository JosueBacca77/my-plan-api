import { NewPlan } from "./types";

export class CreatePlanStrategy {
    createPlan(newPlan: NewPlan ){
        throw new Error("Method createPlan must be implemented");
    };
};