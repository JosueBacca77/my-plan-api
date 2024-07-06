import { PlanExerciseInterface, PlanModel } from "../models/plan.model";
import { UserModel } from "../models/user.model.";
import { CreatePlanContext } from "../patterns/strategy/plans/creation/Plans";
import { SpecificRoutinePlanStrategy } from "../patterns/strategy/plans/creation/SpecificRoutinePlanStrategy";
import { NewPlan } from "../patterns/strategy/plans/creation/types";
import { Plan } from "../models/plan.model";


export const createPlan = async (user: UserModel, plan: NewPlan): Promise<PlanExerciseInterface>=>{

    const createPlanContext = new CreatePlanContext();

    if(!plan.planExercises && plan.specificRoutine){
       createPlanContext.setStrategy(new SpecificRoutinePlanStrategy);
    };

    const createdPlan = await createPlanContext.createPlan(plan)

    return createdPlan

}