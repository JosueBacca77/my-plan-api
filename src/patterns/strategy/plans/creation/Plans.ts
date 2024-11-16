import { UserModel } from '../../../../models/user.model.';
import { CreatePlanStrategy } from './Strategy';
import { NewPlan } from './types';

export class CreatePlanContext {
  private strategy: CreatePlanStrategy;

  setStrategy(strategy: CreatePlanStrategy) {
    this.strategy = strategy;
  }

  async createPlan(newPlan: NewPlan, user: UserModel) {
    if (!this.strategy) throw new Error('Creation plan stratgy not set');

    return this.strategy.createPlan(newPlan, user);
  }
}
