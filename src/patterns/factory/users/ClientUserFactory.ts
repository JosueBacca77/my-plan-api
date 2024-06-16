import Client from "../../../models/client.model.";
import { CLIENT } from "../../../models/user.model.";
import { UserFactory } from "./User";
import { INewRoleUser, IUserFactory } from "./UserFactory";

// Concrete factory for creating client users
export class ClientUserFactory implements IUserFactory {
  async createUser(profileInfo: Record<string, any>): Promise<INewRoleUser> {
    const role = CLIENT;
    const permissions = [];

    const userFactory = new UserFactory(role, profileInfo, permissions);

    const user = await userFactory.createUser();

    const client = await Client.create({
      birthDate: profileInfo.birthDate,
      height: profileInfo.height,
      weight: profileInfo.weight,
      conditions: profileInfo.conditions,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role,
      },
    });

    return client;
  }
}
