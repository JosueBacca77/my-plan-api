const mongoose = require("mongoose");
const dotenv = require("dotenv");
import app from "./app";

process.on("uncaughtException", (error: Error) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(error.name, error.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/.env` });

const DB: string = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_USER_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

const port: number = Number(process.env.PORT);

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (error: Error) => {
  console.log("UNHANDLED REJECTION");
  console.log(error.name, error.message);

  server.close(() => {
    process.exit(1);
  });
});
