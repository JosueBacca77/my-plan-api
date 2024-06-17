import { Request, Response } from "express";
import createAsync from "../utils/catchAsync";
import { NewPlan } from "../patterns/strategy/plans/creation/types";
import { CreatePlanContext } from "../patterns/strategy/plans/creation/Plans";

export const createPlanController = createAsync(
    async (req: Request, res: Response): Promise<any> => {
  
     const plan: NewPlan = req.body;

     const createPlanContext = new CreatePlanContext();

     if(plan.specificRoutine && !plan.muscularGroupsPlan){
        createPlanContext.setStrategy(new );
     }
  
    //   res.status(response.statusCode).json(response);
    }
  );
  