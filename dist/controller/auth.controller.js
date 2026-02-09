import User from "../model/User.model.js";
import bcrypt from "bcryptjs";
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookies.utils.js";
export const signUp = async (req, res) => {
    try {
        const { username, name, password } = req.body;
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (!name || name.length < 3) {
            return res
                .status(400)
                .json({ message: "Name must be at least 3 characters long" });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            name,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        if (savedUser) {
            generateTokenandSetCookie(res, savedUser._id.toString());
            res.status(201).json({
                message: "User registered successfully",
                data: {
                    _id: savedUser._id.toString(),
                    name: savedUser.name,
                    username: savedUser.username,
                },
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error("Error Sign Up Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        if (!username || !isPasswordValid) {
            return res
                .status(400)
                .json({ message: "Username and password are required" });
        }
        generateTokenandSetCookie(res, user._id.toString());
        res.status(200).json({
            message: "User signed in successfully",
            data: {
                _id: user._id.toString(),
                name: user.name,
                username: user.username,
            },
        });
    }
    catch (error) {
        console.error("Error Sign In Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const signOut = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            maxAge: 0,
        });
        res.status(200).json({ message: "User signed out successfully" });
    }
    catch (error) {
        console.error("Error Sign Out Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=auth.controller.js.map