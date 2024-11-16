import {
  newClientSchema,
  newTrainerSchema,
} from '../../../controllers/schemas/newUser.schema';
import { Role } from '../../../models/user.model.';
import { ClientUserFactory } from './ClientUserFactory';
import { TrainerUserFactory } from './TrainerUserFactory';

export type RolUserFactory = ClientUserFactory | TrainerUserFactory;

export const getUserFactory = (role: Role): RolUserFactory => {
  switch (role) {
    case Role.CLIENT:
      return new ClientUserFactory();

    // case ADMIN:
    //   return new AdminUserFactory();

    case Role.TRAINER:
      return new TrainerUserFactory();

    default:
      return new ClientUserFactory();
  }
};

export const getValidationSchema = (role: Role) => {
  switch (role) {
    case Role.CLIENT:
      return newClientSchema;

    case Role.TRAINER:
      return newTrainerSchema;

    default:
      return null;
  }
};
