import type { Request, Response } from "express";
import List from "../model/List.model.js";
import {
    CreateListBody,
    CreateListResponse,
    UpdateListBody,
    UpdateListResponse,
} from "../types/list.types.js";

export const createList = async (
    req: Request<{}, {}, CreateListBody>,
    res: Response<CreateListResponse>
): Promise<void> => {
    try {
        const { title, content, completed, difficulty } = req.body;

        if (!title || !title.trim()) {
            res.status(400).json({ message: "Add Title" });
            return;
        }

        if (!content || !content.trim()) {
            res.status(400).json({ message: "Add Content" });
            return;
        }

        const newList = await List.create({
            user: req.user!._id,
            title,
            content,
            completed,
            difficulty,
        });

        if (newList) {
            res.status(201).json({
                message: "Note created successfully",
                data: {
                    _id: newList._id.toString(),
                    title: newList.title,
                    content: newList.content,
                    completed: newList.completed,
                    difficulty: newList.difficulty,
                    createdAt: newList.createdAt.toISOString(),
                    updatedAt: newList.updatedAt.toISOString(),
                },
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error Create List Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const reviewList = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const lists = await List.find({ user: req.user!._id }).sort({
            createdAt: -1,
        });

        res.status(200).json(lists);
    } catch (error) {
        console.error("Error Review List Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateList = async (
    req: Request<{ id: string }, {}, UpdateListBody>,
    res: Response<UpdateListResponse>
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, content, completed, difficulty } = req.body;

        if (!title || !title.trim()) {
            res.status(400).json({ message: "Add Title" });
            return;
        }

        if (!content || !content.trim()) {
            res.status(400).json({ message: "Add Content" });
            return;
        }

        const updatedList = await List.findOneAndUpdate(
            { _id: id, user: req.user!._id },
            {
                ...(title && { title }),
                ...(content && { content }),
                completed,
                difficulty,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedList) {
            res.status(404).json({ message: "List not found" });
            return;
        }

        res.status(200).json({
            message: "List updated successfully",
            data: {
                _id: updatedList._id.toString(),
                title: updatedList.title,
                content: updatedList.content,
                completed: updatedList.completed,
                difficulty: updatedList.difficulty,
                createdAt: updatedList.createdAt.toISOString(),
                updatedAt: updatedList.updatedAt.toISOString(),
            },
        });
    } catch (error) {
        console.error("Error Update List Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteList = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const deletedList = await List.findOneAndDelete({
            _id: req.params.id,
            user: req.user!._id,
        });
        if (!deletedList) {
            res.status(404).json({ message: "List not found" });
            return;
        }

        res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
        console.error("Error Delete List Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListId = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const list = await List.findOne({
            _id: id,
            user: req.user!._id,
        });

        if (!list) {
            res.status(404).json({ message: "List not found" });
            return;
        }

        res.status(200).json({
            _id: list._id.toString(),
            title: list.title,
            content: list.content,
            completed: list.completed,
            difficulty: list.difficulty,
            createdAt: list.createdAt.toISOString(),
            updatedAt: list.updatedAt.toISOString(),
        });
    } catch (error) {
        console.error("Error Get List By ID Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateListStatus = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const updatedList = await List.findByIdAndUpdate(
            id,
            { completed: "completed" },
            { new: true }
        );

        if (!updatedList) {
            res.status(404).json({ message: "Task not found" });
            return;
        }

        res.status(200).json(updatedList);
    } catch (error) {
        console.error("Error Update List Status Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
