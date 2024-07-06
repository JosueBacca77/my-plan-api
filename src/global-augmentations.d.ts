import { UserModel } from "./models/user.model.";

//TODO: figure out how to import this file from app.ts
// global-augmentations.d.ts
// export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}
