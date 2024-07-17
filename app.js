import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import cors from "cors";
import "dotenv/config";
import characterRoutes from "./routes/characters.js";
import leaderboardRoutes from "./routes/leaderboard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/characters", characterRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

export default app;
