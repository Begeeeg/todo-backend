import mongoose, { Types, Schema } from "mongoose";

export interface IList {
    user: Types.ObjectId;
    title: string;
    content: string;
    completed: "pending" | "progress" | "completed";
    difficulty: "water" | "pebble" | "sand" | "rock";
    createdAt: Date;
    updatedAt: Date;
}

const listSchema = new Schema<IList>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        completed: {
            type: String,
            enum: ["pending", "progress", "completed"],
            default: "pending",
        },
        difficulty: {
            type: String,
            enum: ["water", "pebble", "sand", "rock"],
            default: "water",
        },
    },
    { timestamps: true }
);

const List = mongoose.model<IList>("List", listSchema);

export default List;
