import { EmailService } from "../common/Email/email";
import { handlerFactory } from "../common/handlerFactory";
import { RequestCreateInvitationBody } from "../controllers/invitation.controler";
import { Invitation } from "../models/invitation.model";
import { ResponseBody } from "../utils/http";
import { generateToken } from "../utils/tokens";

const getInvitationService = async () => handlerFactory.getDocument(Invitation);

const createInvitationService = async (body: RequestCreateInvitationBody): Promise<ResponseBody>=>{

    const { email, name, lastName, role, phone } = body;

    const foundInvitation = await Invitation.findOne({ email }).sort({_id: -1}).lean();

    const expiredDate = foundInvitation?.tokenExpires;

    if (foundInvitation && expiredDate > new Date()) {
      //There is an invtation for this user that hasn't expired
      const response: ResponseBody = {
        status: "error",
        statusCode: 409,
        message: `Invitation for ${email} already sent`,
        data: {
          foundInvitation,
        },
      };
      return response;
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

    try {
        const emailService = new EmailService();

        emailService.sendInvitation({
            firstName: name,
            token: tokens.token,
            to: email
        })

    } catch (error) {
        const response: ResponseBody = {
            status: "success",
            statusCode: 207,
            message: `Invitation to ${email} has been created successfully, but there was an error sending it`,
            data: {
                status: "multi-status",
                responses: [
                    {
                        statusCode: 201,
                        status: "success",
                        message: `Invitation to ${email} has been created successfully.`,
                    },
                    {
                        statusCode: 500,
                        status: "error",
                        message: `There was an error sending the invitation`,
                    },
                ]
            },
          };
          return response
    }

    const response: ResponseBody = {
        status: "success",
        statusCode: 200,
        message: `Invitation to ${email} has been sent successfully`,
        data: newInvitation,
      };

    return response
}

export {createInvitationService, getInvitationService }
