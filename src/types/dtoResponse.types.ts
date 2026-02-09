export interface ListResponse {
    _id: string;
    title: string;
    content: string;
    completed: "pending" | "progress" | "completed";
    difficulty: "water" | "pebble" | "sand" | "rock";
    createdAt: string;
    updatedAt: string;
}
