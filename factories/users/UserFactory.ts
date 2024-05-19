import ClientModel from "../../models/client.model.";
import TrainerModel from "../../models/trainer.model";
import { Document } from "mongoose";

// ClientModel Interface
export interface IClient extends Document {
  birthDate: Date;
  height: number;
  weight: number;
  conditions?: string[];
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    photo?: string;
  };
  plans?: string[];
}

// TrainerModel Interface
export interface ITrainer extends Document {
  hiredDate?: Date;
  birthDate: Date;
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    photo?: string;
  };
}

export type INewRoleUser = IClient | ITrainer;

// Abstract factory interface
export interface IUserFactory {
  createUser(profileInfo: Record<string, any>): Promise<INewRoleUser>;
}
