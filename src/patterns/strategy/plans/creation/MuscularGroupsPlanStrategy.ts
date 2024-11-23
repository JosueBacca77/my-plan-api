import Client, { ClientModel } from '../../../../models/client.model.';
import Exercise from '../../../../models/exercise.model';
import { MuscularGroup } from '../../../../models/muscularGroup.model';
import {
  Plan,
  PlanExerciseInterface,
  PlanModel,
  PlanMuscularGroupInterface,
} from '../../../../models/plan.model';
import { Target, TargetModel } from '../../../../models/target.model';
import { UserModel } from '../../../../models/user.model.';
import { CreatePlanStrategy } from './Strategy';
import { NewPlan } from './types';

export class MuscularGroupPlanStrategy implements CreatePlanStrategy {
  async createPlan(newPlan: NewPlan, user: UserModel): Promise<any> {
    const client: ClientModel = await Client.findById(newPlan.client).lean();

    const target: TargetModel = await Target.findById(newPlan.target).lean();

    const plansMuscularGroup: PlanMuscularGroupInterface[] = [];

    for (let index = 0; index < newPlan.planExercises.length; index++) {
      const newPlanExercise = newPlan.planExercises[index];
      const exercise = await Exercise.findById(newPlanExercise.exercise).lean();

      const planExercise: PlanExerciseInterface = {
        ...newPlanExercise,
        exercise: {
          name: exercise.name,
          description: exercise.description,
          files: exercise.files,
        },
      };

      const foundPlanMuscularGroup = plansMuscularGroup.find(
        (plan) => plan.muscularGroup.id === exercise.muscularGroup
      );

      if (foundPlanMuscularGroup) {
        foundPlanMuscularGroup.exercises.push(planExercise);
      } else {
        const muscularGroup = await MuscularGroup.findById(
          exercise.muscularGroup
        ).lean();

        const planMuscularGroup: PlanMuscularGroupInterface = {
          muscularGroup: {
            id: muscularGroup._id,
            name: muscularGroup.name,
            description: muscularGroup.description,
          },
          exercises: [planExercise],
        };
        plansMuscularGroup.push(planMuscularGroup);
      }
    }

    const planToCreate: PlanModel = {
      startDate: newPlan.startDate,
      finishDate: newPlan.finishDate,
      warmUp: newPlan.warmUp,
      finalBlock: newPlan.finalBlock,
      target: {
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
      trainer: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        id: user._id,
      },
      muscularGroups: plansMuscularGroup,
    };

    const planCreated = await Plan.create(planToCreate);

    return planCreated;
  }
}
