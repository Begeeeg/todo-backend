import mongoose, { Schema } from "mongoose";
const listSchema = new Schema({
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
}, { timestamps: true });
const List = mongoose.model("List", listSchema);
export default List;
//# sourceMappingURL=List.model.js.map