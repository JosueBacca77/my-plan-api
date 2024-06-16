import { Request, Response } from "express";
import createAsync from "../utils/catchAsync";
import { Role, UserModel } from "../models/user.model.";
import { ResponseBody } from "../utils/http";
import { createInvitationService, getInvitationService } from "../services/invitation.service";

export interface RequestCreateInvitationBody extends UserModel {
  role: Role;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export const getInvitationController = async () => await getInvitationService();

export const createInvitationController = createAsync(
  async (req: Request, res: Response): Promise<any> => {

    const body: RequestCreateInvitationBody = req.body;
    
    const response: ResponseBody = await createInvitationService(body);

    res.status(response.statusCode).json(response);
  }
);
