import { Request, Response } from "express";
import createAsync from "../utils/catchAsync";
import User, { Rol, UserModel } from "../models/user.model.";
import { Invitation } from "../models/invitation.model";
import { ResponseBody } from "../utils/http";
import { handlerFactory } from "../common/handlerFactory";

interface RequestCreateInvitationBody extends UserModel {
  rol: Rol;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export const getInvitation = handlerFactory.getDocument(Invitation);

export const createInvitation = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const body: RequestCreateInvitationBody = req.body;

    const { email, name, lastName, rol, phone } = body;

    const foundInvitation = await Invitation.findOne({ email });

    if (foundInvitation) {
      const response: ResponseBody = {
        status: "error",
        statusCode: 409,
        message: `Invitation for ${email} already sent`,
        data: {
          foundInvitation,
        },
      };
      return res.status(response.statusCode).json(response);
    }

    const newInvitation = await Invitation.create({
      name,
      lastName,
      email,
      phone,
      rol,
    });

    const response: ResponseBody = {
      status: "success",
      statusCode: 200,
      message: `Invitation to ${email} has been sent successfully`,
      data: newInvitation,
    };

    res.status(response.statusCode).json(response);
  }
);
