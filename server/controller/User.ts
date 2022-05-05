import { Request, Response } from "express";
import User from "../model/User";
import Password from "../services/password";
import respond from "../services/Respond";

export default class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        $or: [{ email: username }, { username }],
      });
      if (!user) {
        return respond(
          res,
          404,
          false,
          "Didn't find any user with this Username or Email Address"
        );
      }
      if (!(await Password.compare(password, user!.password as string))) {
        return respond(res, 403, false, "Incorrect Password! Please try again");
      }
      const token = await user.createToken();

      return respond(res, 200, true, "Successfully logged in!", {
        token,
      });
    } catch ({ message }) {
      return respond(res, 500, false, message as string);
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (await User.checkMeta({ email })) {
        return respond(
          res,
          401,
          false,
          "This Email is already registered with us"
        );
      }

      const newUser = {
        ...req.body,
      };

      const user = await User.build(newUser);
      await user.save();

      user.toObject();
      const token = await user.createToken();

      return respond(res, 201, true, "Successfully created user", {
        ...user.toObject(),
        token,
      });
    } catch ({ message }) {
      console.log("message: ", message);
      return respond(res, 500, false, message as string);
    }
  }
}
