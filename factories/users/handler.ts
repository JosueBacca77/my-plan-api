import {
  newClientSchema,
  newTrainerSchema,
} from "../../controllers/schemas/newUser.schema";
import { CLIENT, Role, TRAINER } from "../../models/user.model.";
import { ClientUserFactory } from "./ClientUserFactory";
import { TrainerUserFactory } from "./TrainerUserFactory";

export type RolUserFactory = ClientUserFactory | TrainerUserFactory

export const getUserFactory = (role: Role): RolUserFactory => {
  switch (role) {
    case CLIENT:
      return new ClientUserFactory();

    // case ADMIN:
    //   return new AdminUserFactory();

    case TRAINER:
      return new TrainerUserFactory();

    default:
      return new ClientUserFactory();
  }
};

export const getValidationSchema = (role: Role) => {
  switch (role) {
    case CLIENT:
      return newClientSchema;

    case TRAINER:
      return newTrainerSchema;

    default:
      return null;
  }
};
