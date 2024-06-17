import { CreatePlanStrategy } from "./Strategy"
import { NewPlan } from "./types";

export class CreatePlanContext {
    private strategy: CreatePlanStrategy;

    setStrategy(strategy: CreatePlanStrategy){
        this.strategy = strategy;
    };

    createPlan(newPlan: NewPlan){
        if(!this.strategy) throw new Error('Creation plan stratgy not set');

        this.strategy.createPlan(newPlan);
    };
}