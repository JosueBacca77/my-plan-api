import { Request, Response } from 'express';
import createAsync from '../utils/catchAsync';
import { NewPlan } from '../patterns/strategy/plans/creation/types';
import { ResponseBody } from '../utils/http';
import {
  createPlan,
  getMyCurrentPlan,
  setMyCurrentPlanService,
} from '../services/plans.service';
import Client from '../models/client.model.';
import { Role } from '../models/user.model.';
import { PlanModel } from '../models/plan.model';

export const createPlanController = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const plan: NewPlan = req.body;

    const user = req.user;

    if (user.role !== Role.TRAINER) {
      const response: ResponseBody = {
        status: 'error',
        statusCode: 403,
        message: `Plans can only be created by a trainer user`,
        data: null,
      };
      res.status(response.statusCode).json(response);
    }

    //Validate client
    if (!(await Client.find({ id: plan.client }))) {
      const response: ResponseBody = {
        status: 'error',
        statusCode: 400,
        message: `Client with id ${plan.client} doesn't exists`,
        data: null,
      };
      return response;
    }

    const createdPlan = await createPlan(user, plan);

    const response: ResponseBody = {
      status: 'success',
      statusCode: 201,
      message: `Plan created successfully`,
      data: createdPlan,
    };
    res.status(response.statusCode).json(response);
  }
);

export const getMyCurrentPlanController = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const user = req.user;

    const myCurrentPlan: PlanModel | null = await getMyCurrentPlan(
      user._id.toString()
    );

    if (!myCurrentPlan) {
      const response: ResponseBody = {
        status: 'error',
        statusCode: 404,
        message: `You haven't set a current plan`,
        data: null,
      };
      res.status(response.statusCode).json(response);
    }

    const response: ResponseBody = {
      status: 'success',
      statusCode: 200,
      message: ``,
      data: myCurrentPlan,
    };
    res.status(response.statusCode).json(response);
  }
);

export const setMyCurrentPlanController = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const user = req.user;
    const planId = req.params.id;

    const response = await setMyCurrentPlanService(planId, user._id);

    res.status(response.statusCode).json(response);
  }
);
