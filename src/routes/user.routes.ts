import express from "express";
import { getUserProfile } from "../controller/user.contoller.js";
import { protectRoutes } from "../middleware/protectRoutes.middleware.js";

const router = express.Router();

router.get("/profile", protectRoutes, getUserProfile);

export default router;
