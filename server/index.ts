import express, {
  Express,
  Response,
  Request,
  ErrorRequestHandler,
} from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { stream, logger } from "./logger/winston";
import "dotenv/config";

import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import cors from "cors";
const bodyParser = require("body-parser");

import botRoute from "./routes/botRoute";
import userRoute from "./routes/userRoute";

let app: Express = express();

mongoose.Promise = global.Promise;

app.use(cors());

(async () => {
  try {
    console.log(
      Buffer.from(
        process.env.FRONT_APP_CLIENT_ID + ":" + process.env.FRONT_CLIENT_SECRET
      ).toString("base64")
    );

    await mongoose.connect(
      process.env.DATABASE_URL ? process.env.DATABASE_URL : ""
    );

    console.log("MongoDB connected");

    app.use(
      session({
        resave: false,
        secret: "secretkey",
        cookie: {},
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    const port = process.env.PORT || 3002;

    app.use(morgan("combined", { stream: stream }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/api/v1/bot", botRoute);
    app.use("/api/v1/auth", userRoute);

    app.use(function (err: any, req: Request, res: Response, next: any) {
      logger.error(
        err.response ? err.response.data : err.stack ? err.stack : err
      );

      res.status(err.response.status || 500).send({
        mesage: err.response ? err.response.data : err.stack ? err.stack : err,
        description: `Something broke!. Check application logs for helpful tips. OriginalUrl: ${req.originalUrl}  `,
      });
    });

    app.get("/", (req, res) => {
      return res.status(200).send({ message: "Welcome to i-Database 1.0" });
    });

    app.listen(port, () => {
      console.log(`Server is Listening at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

export default app;
