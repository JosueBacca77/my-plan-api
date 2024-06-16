import User from "../../../models/user.model.";

// Define the structure of a User
export interface IUser {
  role: string;
  profileInfo: Record<string, any>;
  permissions: string[];
}

// Implement the User class
export class UserFactory implements IUser {
  role: string;
  profileInfo: Record<string, any>;
  permissions: string[];

  constructor(
    role: string,
    profileInfo: Record<string, any>,
    permissions: string[]
  ) {
    this.role = role;
    this.profileInfo = profileInfo;
    this.permissions = permissions;
  }

  async createUser() {
    return await User.create({
      name: this.profileInfo.name,
      lastName: this.profileInfo.lastName,
      email: this.profileInfo.email,
      password: this.profileInfo.password,
      role: this.role,
    });
  }
}
