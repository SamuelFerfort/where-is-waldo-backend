import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export async function leaderboardPost(req, res) {
  const { name, duration, imageId, sessionToken } = req.body;

  try {
    const decodedToken = jwt.verify(sessionToken, process.env.JWT_SECRET);

    if (decodedToken.imageId !== imageId) {
      return res.status(400).json({ message: "Session mismatch" });
    }

    const actualDuration = Date.now() - decodedToken.startTime;

    if (Math.abs(actualDuration - duration) > 5000) {
      return res.status(400).json({ message: "Invalid duration" });
    }

    const newEntry = await prisma.leaderboard.create({
      data: { name, duration: actualDuration, imageId },
    });
    res.json(newEntry);
  } catch (err) {
    console.error("Error posting to leaderboard", err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(400)
        .json({ message: "Invalid or expired session token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      orderBy: [
        {
          duration: "asc",
        },
      ],
    });
    res.json(leaderboard);
  } catch (err) {
    console.error("Error getting leaderboard", err);

    res.status(500).json(err.message);
  }
};
