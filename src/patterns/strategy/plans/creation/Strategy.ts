import { UserModel } from "../../../../models/user.model.";
import { NewPlan } from "./types";

export class CreatePlanStrategy {
    createPlan(newPlan: NewPlan, user: UserModel ): Promise<any>{
        throw new Error("Method createPlan must be implemented");
    };
};