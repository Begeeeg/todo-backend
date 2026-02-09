import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.config.js";
import listRoutes from "./routes/list.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [
            "http://localhost:3000", // for local development
            "https://todo-frontend-seven-fawn.vercel.app", // your production frontend
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/lists", listRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
