import { Plan, PlanModel } from '../models/plan.model';
import { UserModel } from '../models/user.model.';
import { MuscularGroupPlanStrategy } from '../patterns/strategy/plans/creation/MuscularGroupsPlanStrategy';
import { CreatePlanContext } from '../patterns/strategy/plans/creation/Plans';
import { SpecificRoutinePlanStrategy } from '../patterns/strategy/plans/creation/SpecificRoutinePlanStrategy';
import { NewPlan } from '../patterns/strategy/plans/creation/types';
import { ResponseBody } from '../utils/http';

export const createPlan = async (
  user: UserModel,
  plan: NewPlan
): Promise<PlanModel> => {
  const createPlanContext = new CreatePlanContext();

  if (!plan.planExercises && plan.specificRoutine) {
    createPlanContext.setStrategy(new SpecificRoutinePlanStrategy());
  }

  if (plan.planExercises && !plan.specificRoutine) {
    createPlanContext.setStrategy(new MuscularGroupPlanStrategy());
  }
  const createdPlan = await createPlanContext.createPlan(plan, user);

  return createdPlan;
};

export const getMyCurrentPlan = async (
  user: UserModel
): Promise<PlanModel | null> => {
  const plan: PlanModel = await Plan.findOne({
    'client.id': user._id.toString(),
    active: true,
  }).lean();

  return plan;
};

export const setMyCurrentPlanService = async (
  planId: string,
  userId: string
): Promise<ResponseBody> => {
  const plan = await Plan.findById(planId);

  if (!plan) {
    const response: ResponseBody = {
      status: 'error',
      statusCode: 404,
      message: `Plan with id ${planId} not found`,
      data: null,
    };
    return response;
  }

  if (plan.client.id !== userId.toString()) {
    const response: ResponseBody = {
      status: 'error',
      statusCode: 403,
      message: `You can only set your own current plan`,
      data: null,
    };
    return response;
  }

  const previousCurrentPlan = await Plan.findOne({
    'client.id': userId.toString(),
    _id: { $ne: planId },
    active: true,
  });

  if (previousCurrentPlan) {
    previousCurrentPlan.active = false;
    await previousCurrentPlan.save();
  }

  if (plan.active) {
    const response: ResponseBody = {
      status: 'success',
      statusCode: 200,
      message: `The plan is already the current one!`,
      data: plan,
    };
    return response;
  }

  plan.active = true;

  await plan.save();

  const response: ResponseBody = {
    status: 'success',
    statusCode: 200,
    message: `Current plan set successfully`,
    data: plan,
  };
  return response;
};
