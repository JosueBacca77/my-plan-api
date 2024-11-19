import { RequestCreateAdminBody } from '../controllers/admin.controller';
import { Role } from '../models/user.model.';
import {
  getUserFactory,
  RolUserFactory,
} from '../patterns/factory/users/handler';
import { INewRoleUser } from '../patterns/factory/users/UserFactory';
import { ResponseBody } from '../utils/http';

export const createAdminService = async (body: RequestCreateAdminBody) => {
  const { email, password, name, lastName } = body;

  const factory: RolUserFactory = getUserFactory(Role.ADMIN);

  const newAdminUser: INewRoleUser = await factory.createUser({
    email,
    password,
    name,
    lastName,
  });

  const response: ResponseBody = {
    status: 'success',
    statusCode: 200,
    message: `Admin user was created successfully`,
    data: newAdminUser,
  };

  return response;
};
