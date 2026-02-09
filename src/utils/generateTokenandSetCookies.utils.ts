import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

export const generateTokenandSetCookie = (res: Response, userId: string) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
};
