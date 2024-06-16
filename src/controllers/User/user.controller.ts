import { Request, Response } from "express";
import createAsync from "../../utils/catchAsync";
import { ResponseBody } from "../../utils/http";
import { logInService, signUpService } from "../../services/Auth/auth.service";
import { LogInBody, RequestSignUpClientBody, RequestSignUpTrainerBody } from "./types";
import { LoginResponse } from "../../services/Auth/types";

// const getAllExercises = handlerFactory.getAllDocuments(Exercise);

export const signUpController = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const body: RequestSignUpTrainerBody | RequestSignUpClientBody = req.body;
    const response: ResponseBody = await signUpService(body);

    res.status(response.statusCode).json(response);
  }
)

export const logInController = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const body: LogInBody = req.body;

    const {email, password} = body;

    const tokenData: LoginResponse = await logInService(email, password);

    if(!tokenData.generatedToken){
      const response: ResponseBody = {
        status: 'error',
        statusCode: 401,
        message: `Not authorized`,
        data: null,
      };

      return res.status(response.statusCode).json(response);
    };

    tokenData.user.password = undefined;

    const response: ResponseBody = {
      status: 'success',
      statusCode: 200,
      message: 'Log in successfully!',
      data: {
        user: tokenData.user,
        token: tokenData.generatedToken.token
      },
    };

    res.cookie("jwt", tokenData.generatedToken.token, tokenData.generatedToken.cookieOptions);

    res.status(response.statusCode).json(response);
  }
)