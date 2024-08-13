import express from "express";
import {
  leaderboardPost,
  getLeaderboard,
} from "../controllers/leaderboardController.js";
const router = express.Router();

router.post("/", leaderboardPost);

router.get("/", getLeaderboard);

export default router;
