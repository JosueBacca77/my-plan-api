import Client, { ClientModel } from "../../../../models/client.model.";
import { Plan, PlanModel } from "../../../../models/plan.model";
import { Target, TargetModel } from "../../../../models/target.model";
import { UserModel } from "../../../../models/user.model.";
import { CreatePlanStrategy } from "./Strategy";
import { NewPlan } from "./types";

export class SpecificRoutinePlanStrategy implements CreatePlanStrategy {
    async createPlan(newPlan: NewPlan, user:UserModel): Promise<void> {

        const client: ClientModel = await Client.find({id: newPlan.client}).lean();

        const target: TargetModel = await Target.find({id: newPlan.target}).lean();

        const planToCreate: PlanModel = {
            startDate: newPlan.startDate,
            finishDate: newPlan.finishDate,
            warmUp: newPlan.warmUp,
            finalBlock: newPlan.finalBlock,
            target:{
                id: target._id,
                name: target.name,
                description: target.description,
                color: target.color,
            },
            client: {
                id: client.user.id,
                name: client.user.name,
                lastName: client.user.lastName,
                email: client.user.email,
                weight: client.weight,
                height: client.height,
                conditions: client.conditions,
                birthDate: client.birthDate,
            },
            trainer:{
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                id: user.id,
            }
        }

        await Plan.create(newPlan);

        
    }
}