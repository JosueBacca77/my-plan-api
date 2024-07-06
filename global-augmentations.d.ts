import { UserModel } from "./src/models/user.model.";

// global-augmentations.d.ts
export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}
