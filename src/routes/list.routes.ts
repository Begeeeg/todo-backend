import express from "express";
import {
    createList,
    deleteList,
    getListId,
    reviewList,
    updateList,
    updateListStatus,
} from "../controller/list.controller.js";
import { protectRoutes } from "../middleware/protectRoutes.middleware.js";

const router = express.Router();

router.post("/create", protectRoutes, createList);
router.get("/review", protectRoutes, reviewList);
router.patch("/update/:id", protectRoutes, updateList);
router.delete("/delete/:id", protectRoutes, deleteList);
router.get("/idlist/:id", protectRoutes, getListId);
router.patch("/updatestatus/:id", protectRoutes, updateListStatus);

export default router;
