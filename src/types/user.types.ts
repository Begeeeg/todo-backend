import { IUser } from "../model/User.model.js";

export interface SignUpBody {
  username?: string;
  name?: string;
  password?: string;
}

export interface SignInBody {
  username?: string;
  password?: string;
}

export type SignUpListResponse = {
  message: string;
  data?: {
    _id: string;
    name: string;
    username: string;
  };
};

export type SignInListResponse = {
  message: string;
  data?: {
    _id: string;
    name: string;
    username: string;
  };
};

export type SignOutListResponse = { message: string };
