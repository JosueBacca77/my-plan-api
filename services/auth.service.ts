import crypto from "crypto";
import { RequestSignUpClientBody, RequestSignUpTrainerBody } from "../controllers/user.controller";
import { Invitation } from "../models/invitation.model";
import { ResponseBody } from "../utils/http";
import { RolUserFactory, getUserFactory, getValidationSchema } from "../factories/users/handler";
import { INewRoleUser } from "../factories/users/UserFactory";

export const signUpService = 
    async (body: RequestSignUpTrainerBody | RequestSignUpClientBody): Promise<any> => {
  
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
        return response
      }
  
      if (invitation.isUsed) {
        const response: ResponseBody = {
          status: "error",
          statusCode: 401,
          message: `Invitation has already been used and user created successfully`,
          data: null,
        };
        return response
      }
  
      //Check invitation is not expired
      if (invitation.tokenExpires < new Date()) {
        const response: ResponseBody = {
          status: "error",
          statusCode: 401,
          message: `Invitation for ${invitation.email} has expired`,
          data: {
            foundInvitation: invitation,
          },
        };
        return response
      }
  
      let validationSchema = getValidationSchema(invitation.role);
  
      if (!validationSchema) {
        const response: ResponseBody = {
            status: "error",
            statusCode: 400,
            message: "Invalid role",
            data: null,
          };
          return response;
      }
  
      const newUserData = {
        ...body,
        email: invitation.email,
        role: invitation.role
      };
  
      try {
        const { error } = validationSchema.validate(newUserData);
        if (error) {
            const response: ResponseBody = {
                status: "error",
                statusCode: 400,
                message: "Validation error",
                data: error.details,
            };
            return response;
        }
      } catch (validationError) {
        const response: ResponseBody = {
            status: "error",
            statusCode: 400,
            message: "Validation failed",
            data: validationError,
        };
        return response;
      }
  
      const factory: RolUserFactory = getUserFactory(invitation.role);
  
      const newUser: INewRoleUser = await factory.createUser(newUserData);
  
      //Set invitaation as used
      invitation.isUsed = true;
      await invitation.save();
  
      const response: ResponseBody = {
        status: "success",
        statusCode: 200,
        message: "User registered successfully",
        data: newUser,
      };
  
      return response
    }