import User from "../model/User.model.js";
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user: user });
    }
    catch (error) {
        console.error("Error Get User Profile Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=user.contoller.js.map