import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const leaderboardPost = async (req, res) => {
  const { name, time, imageId } = req.body;

  try {
    await prisma.leaderboard.create({
      data: {
        name,
        timestamp: time,
        imageId,
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error posting to leaderboard", err);
    res.status(500).json(err.message);
  }
};

export const getLeaderboard = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    const leaderboard = await prisma.leaderboard.findMany({
      where: { imageId },
    });
    res.json(leaderboard);
  } catch (err) {
    console.error("Error getting leaderboard", err);

    res.status(500).json(err.message);
  }
};
