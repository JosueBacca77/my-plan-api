import { handlerFactory } from "../common/handlerFactory";
import { Request, Response } from "express";

import Exercise from "../models/exercise.model";
import User from "../models/user.model.";
import createAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";

// const getAllExercises = handlerFactory.getAllDocuments(Exercise);

interface User {
  name: string;
  email: string;
  password: string;
}

interface RequestBody extends User {
  // Agrega aquí cualquier otro campo necesario en el cuerpo de la solicitud
}

interface ResponseBody {
  status: string;
  statusCode: number;
  message: string;
}

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
  async (req: Request, res: Response): Promise<void> => {
    const { name, lastName, email, password, passwordConfirm, photo } =
      req.body;

    const newUser = await User.create({
      name,
      lastName,
      email,
      photo,
      password,
      passwordConfirm,
    });

    // const url = `${req.protocol}://${req.get("host")}/me`;

    // await new Email(newUser, url).sendWelcome();

    //expiresIn could be a integer (miliseconds) or in this format 90d 10h 5m 3s
    createSendToken(newUser, 201, req, res);

    const response: ResponseBody = {
      status: "success",
      statusCode: 200,
      message: "User registered successfully",
    };

    res.status(response.statusCode).json(response);
  }
);

export const getExercise = handlerFactory.getDocument(Exercise);

export const postExercise = handlerFactory.createDocument(Exercise);

export const patchExercise = handlerFactory.updateDocument(Exercise);

export const deleteExercise = handlerFactory.deleteDocument(Exercise);
