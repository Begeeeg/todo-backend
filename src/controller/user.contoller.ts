import { Request, Response } from "express";
import User from "../model/User.model.js";

export const getUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user: user });
    } catch (error) {
        console.error("Error Get User Profile Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
