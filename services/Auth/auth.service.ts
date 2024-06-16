import crypto from "crypto";
import { Invitation } from "../../models/invitation.model";
import { ResponseBody } from "../../utils/http";
import { RolUserFactory, getUserFactory, getValidationSchema } from "../../factories/users/handler";
import { INewRoleUser } from "../../factories/users/UserFactory";
import User, { UserModel } from "../../models/user.model.";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RequestSignUpClientBody, RequestSignUpTrainerBody } from "../../controllers/User/types";
import { GeneratedToken, LoginResponse } from "./types";


const checkPassword = async function (candidatePassword: string, userPassword: string) {
    const res = await bcrypt.compare(candidatePassword, userPassword)
    return res
  };

  const signToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  const generateUserToken = (user: UserModel) => {
    const token = signToken(user._id);
  
    const cookieOptions = {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      //req.secure ins an express variable
      //we can access to this because of app.set("trust proxy", 1);
      // secure: true // This is essential for HTTPS
    };
  
    //ADDITIONAL CONSIDERATION: If you're using a load balancer or reverse proxy, ensure it's configured to pass the secure flag correctly.
    const resp: GeneratedToken = {
        token,
        cookieOptions
    }
    return resp
  };
  

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

export const logInService = async (email: string, password: string)=>{
    const user = await User.findOne({email}).select('+password').lean();

    const validPassword = await checkPassword(password, user.password)

    if(!validPassword){
        const res: LoginResponse = {
            user: null,
            generatedToken: null
        };
        return res;
    };

    const tokenData = generateUserToken(user);

    const resp: LoginResponse = {
        generatedToken: tokenData,
        user
    };

    return resp
};