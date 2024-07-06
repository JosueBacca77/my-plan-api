import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import muscularGroupsRouter from "./routes/muscularGroup.routes";
import AppError from "./utils/appError";
import { errors } from "celebrate";
import errorHandler from "./controllers/errorController";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import exercisesRoutes from "./routes/exercise..routes";
import usersRoutes from "./routes/users..routes";
import invitationsRoutes from "./routes/invitation.routes";
import targetsRoutes from "./routes/target.routes ";
import { UserModel } from "./models/user.model.";
import plansRoutes from "./routes/plans..routes";

export const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}

app.use(cors());
app.options("*", cors());

app.use(helmet({ contentSecurityPolicy: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: "Too many requests, please try again later.",
});
app.use("/api", limiter);

app.use(compression());

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

// app.use(
//   hpp({
//     whitelist: whiteListParameters,
//   })
// );

//Able x-www-form-urlencode form data to be parsed
app.use(express.urlencoded({ extended: true }));

app.enable("trust proxy");

app.use("/api/v1/muscular-groups", muscularGroupsRouter);
app.use("/api/v1/exercises", exercisesRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/invitations", invitationsRoutes);
app.use("/api/v1/targets", targetsRoutes);
app.use("/api/v1/plans", plansRoutes);


app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`The route ${req.url} doesn't exist`, 404));
});

app.use(errors());

app.use(errorHandler);

export default app;
