import { Role } from '../../../models/user.model.';
import { UserFactory } from './User';
import { IAdmin, IUserFactory } from './UserFactory';

// Concrete factory for creating admin users
export class AdminUserFactory implements IUserFactory {
  async createUser(profileInfo: Record<string, any>): Promise<IAdmin> {
    const role = Role.ADMIN;
    const permissions = [];

    const userFactory = new UserFactory(role, profileInfo, permissions);

    const user = await userFactory.createUser();

    const admin: IAdmin = {
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    };

    return admin;
  }
}
