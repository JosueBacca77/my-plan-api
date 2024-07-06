import { Request, Response } from "express";
import createAsync from "../utils/catchAsync";
import { NewPlan } from "../patterns/strategy/plans/creation/types";
import { TRAINER } from "../models/user.model.";
import { ResponseBody } from "../utils/http";
import { createPlan } from "../services/plans.service";
import Client from "../models/client.model.";

export const createPlanController = createAsync(
    async (req: Request, res: Response): Promise<any> => {
  
     const plan: NewPlan = req.body;

     const user = req.user;

     if(user.role !== TRAINER){
      const response: ResponseBody = {
        status: "error",
        statusCode: 403,
        message: `Plans can only be created by a trainer user`,
        data:null
      };
      res.status(response.statusCode).json(response);
     }

      //Validate client
      if( !(await Client.find({id:plan.client}) )) {
        const response: ResponseBody = {
            status: "error",
            statusCode: 400,
            message: `Client with id ${plan.client} doesn't exists`,
            data:null
        };
        return response;
      }

     const createdPlan = await createPlan(user, plan);
    
   //   if(plan.specificRoutine && plan.planExercises && !plan.specificRoutine){
   //       createPlanContext.setStrategy(new MuscularGroupPlanStrategy);
   //    }

   //    if(plan.specificRoutine && plan.planExercises && !plan.specificRoutine){
   //       createPlanContext.setStrategy(new MuscularGroupPlanStrategy);
   //    }
  
      const response: ResponseBody = {
        status: "success",
        statusCode: 201,
        message: `Plan created successfully`,
        data: createdPlan
      };
      res.status(response.statusCode).json(response);
    }
  );
  