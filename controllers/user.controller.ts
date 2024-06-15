import { Request, Response } from "express";
import createAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import { ResponseBody } from "../utils/http";
import { signUpService } from "../services/auth.service";

interface RequestUserBody {
  name: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  token: string;
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

export const signUpController = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const body: RequestSignUpTrainerBody | RequestSignUpClientBody = req.body;
    const response: ResponseBody = await signUpService(body);

    res.status(response.statusCode).json(response);
  }
)