import express from "express";
import {
  leaderboardPost,
  getLeaderboard,
} from "../controllers/leaderboardController";
const router = express.Router();

router.post("/", leaderboardPost);

router.get("/", getLeaderboard);

export default router;
