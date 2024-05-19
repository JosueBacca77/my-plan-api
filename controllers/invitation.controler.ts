import { Request, Response } from "express";
import createAsync from "../utils/catchAsync";
import { Role, UserModel } from "../models/user.model.";
import { Invitation } from "../models/invitation.model";
import { ResponseBody } from "../utils/http";
import { handlerFactory } from "../common/handlerFactory";
import { generateToken } from "../utils/tokens";

interface RequestCreateInvitationBody extends UserModel {
  role: Role;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export const getInvitation = handlerFactory.getDocument(Invitation);

export const createInvitation = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const body: RequestCreateInvitationBody = req.body;

    const { email, name, lastName, role, phone } = body;

    const foundInvitation = await Invitation.findOne({ email });

    const expiredDate = foundInvitation?.tokenExpires;

    if (foundInvitation && expiredDate > new Date(Date.now())) {
      //Thee is a invtation for this user that hasn't expired
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

    const tokens = generateToken();

    console.log("original token", tokens.token);

    const newInvitation = await Invitation.create({
      name,
      lastName,
      email,
      phone,
      role,
      token: tokens.hashedToken,
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
