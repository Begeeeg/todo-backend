import { ListResponse } from "./dtoResponse.types.js";

export interface CreateListBody {
    title: string;
    content: string;
    completed?: "pending" | "progress" | "completed";
    difficulty?: "water" | "pebble" | "sand" | "rock";
}

export interface UpdateListBody {
    title?: string;
    content?: string;
    completed?: "pending" | "progress" | "completed";
    difficulty?: "water" | "pebble" | "sand" | "rock";
}

export type CreateListResponse = {
    message: string;
    data?: ListResponse;
};

export type UpdateListResponse = {
    message: string;
    data?: ListResponse;
};

export type DeleteListResponse = {
    message: string;
};

export type ReviewListResponse = ListResponse[];
