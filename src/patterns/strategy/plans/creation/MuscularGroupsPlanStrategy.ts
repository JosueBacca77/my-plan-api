import { UserModel } from "../../../../models/user.model.";
import { CreatePlanStrategy } from "./Strategy";
import { NewPlan } from "./types";

export class MuscularGroupPlanStrategy implements CreatePlanStrategy {
    createPlan(newPlan: NewPlan, user: UserModel ): Promise<any>{
        throw new Error("Method createPlan must be implemented");
    };
}