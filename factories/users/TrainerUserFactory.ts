import Trainer from "../../models/trainer.model";
import { TRAINER } from "../../models/user.model.";
import { UserFactory } from "./User";
import { INewRoleUser, IUserFactory } from "./UserFactory";

// Concrete factory for creating admin users
export class TrainerUserFactory implements IUserFactory {
  async createUser(profileInfo: Record<string, any>): Promise<INewRoleUser> {
    const role = TRAINER;
    const permissions = [];

    const userFactory = new UserFactory(role, profileInfo, permissions);

    const user = await userFactory.createUser();

    const trainer = await Trainer.create({
      birthDate: profileInfo.birthDate,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role,
      },
    });

    return trainer;
  }
}
