import { PlanModel } from "../models/plan.model";
import { UserModel } from "../models/user.model.";
import { MuscularGroupPlanStrategy } from "../patterns/strategy/plans/creation/MuscularGroupsPlanStrategy";
import { CreatePlanContext } from "../patterns/strategy/plans/creation/Plans";
import { SpecificRoutinePlanStrategy } from "../patterns/strategy/plans/creation/SpecificRoutinePlanStrategy";
import { NewPlan } from "../patterns/strategy/plans/creation/types";


export const createPlan = async (user: UserModel, plan: NewPlan): Promise<PlanModel>=>{

    const createPlanContext = new CreatePlanContext();

    if(!plan.planExercises && plan.specificRoutine){
       createPlanContext.setStrategy(new SpecificRoutinePlanStrategy);
    };

    if(plan.planExercises && !plan.specificRoutine){
        createPlanContext.setStrategy(new MuscularGroupPlanStrategy);
    };
    const createdPlan = await createPlanContext.createPlan(plan, user)

    return createdPlan

}