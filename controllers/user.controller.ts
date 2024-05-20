import { handlerFactory } from "../common/handlerFactory";
import { Request, Response } from "express";

import Exercise from "../models/exercise.model";
import createAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import Trainer from "../models/trainer.model";
import { ResponseBody } from "../utils/http";
import {
  getUserFactory,
  getValidationSchema,
} from "../factories/users/handler";
import { Invitation } from "../models/invitation.model";
import crypto from "crypto";
import { INewRoleUser } from "../factories/users/UserFactory";
import { newClientSchema, newTrainerSchema } from "./schemas/newUser.schema";
import { CLIENT, Role, TRAINER } from "../models/user.model.";

interface RequestUserBody {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  token: string;
  role: Role;
}

export interface RequestSignUpClientBody extends RequestUserBody {
  birthDate: Date;
  weight?: string;
  height?: string;
  conditions?: string[];
}

export interface RequestSignUpTrainerBody extends RequestUserBody {
  birthDate: Date;
}

// const getAllExercises = handlerFactory.getAllDocuments(Exercise);

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token: string = signToken(user._id);

  const expiresIn = Number(process.env.JWT_EXPIRES_IN);
  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //req.secure ins an express variable
    //we can access to this because of app.set("trust proxy", 1);
    secure: req.secure,
    // secure: true // This is essential for HTTPS
  };

  //ADDITIONAL CONSIDERATION: If you're using a load balancer or reverse proxy, ensure it's configured to pass the secure flag correctly.

  //We cant do this because not all deployed applications are automatically set to https
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  //The password will be included in the response
  //(the select:false in the chema works for find operations)
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const body: RequestSignUpTrainerBody | RequestSignUpClientBody = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(body.token)
      .digest("hex");

    const invitation = await Invitation.findOne({ token: hashedToken });

    if (!invitation) {
      const response: ResponseBody = {
        status: "error",
        statusCode: 401,
        message: `User hasn't been invited`,
        data: null,
      };
      return res.status(response.statusCode).json(response);
    }

    if (invitation.isUsed) {
      const response: ResponseBody = {
        status: "error",
        statusCode: 401,
        message: `Invitation has already been used and user created successfully`,
        data: null,
      };
      return res.status(response.statusCode).json(response);
    }

    if (invitation.email != body.email) {
      const response: ResponseBody = {
        status: "error",
        statusCode: 400,
        message: `Email and token don't match`,
        data: null,
      };
      return res.status(response.statusCode).json(response);
    }

    if (body.role != invitation.role) {
      const response: ResponseBody = {
        status: "error",
        statusCode: 400,
        message: `Role sent doesn't match the invitation role`,
        data: null,
      };
      return res.status(response.statusCode).json(response);
    }

    //Check invitation is not expired
    if (invitation.tokenExpires < new Date()) {
      const response: ResponseBody = {
        status: "error",
        statusCode: 401,
        message: `Invitation for ${body.email} has expired`,
        data: {
          foundInvitation: invitation,
        },
      };
      return res.status(response.statusCode).json(response);
    }

    let validationSchema = getValidationSchema(body.role);

    if (!validationSchema) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Invalid role",
        data: null,
      });
    }

    try {
      const { error } = validationSchema.validate(body);
      if (error) {
        return res.status(400).json({
          status: "error",
          statusCode: 400,
          message: "Validation error",
          data: error.details,
        });
      }
    } catch (validationError) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Validation failed",
        data: validationError,
      });
    }

    const factory = getUserFactory(invitation.role);

    const newUser: INewRoleUser = await factory.createUser(body);

    //Set invitaation as used
    invitation.isUsed = true;
    await invitation.save();

    const response: ResponseBody = {
      status: "success",
      statusCode: 200,
      message: "User registered successfully",
      data: newUser,
    };

    res.status(response.statusCode).json(response);
  }
);

export const getExercise = handlerFactory.getDocument(Exercise);

export const postExercise = handlerFactory.createDocument(Exercise);

export const patchExercise = handlerFactory.updateDocument(Exercise);

export const deleteExercise = handlerFactory.deleteDocument(Exercise);
