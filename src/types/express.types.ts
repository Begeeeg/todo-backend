import { IUser } from "../model/User.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
