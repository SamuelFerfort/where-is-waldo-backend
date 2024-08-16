import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const leaderboardPost = async (req, res) => {
  const { name, duration, imageId } = req.body;

  try {
    const newEntry = await prisma.leaderboard.create({
      data: {
        name,
        duration,
        imageId,
      },
    });

    res.json(newEntry);
  } catch (err) {
    console.error("Error posting to leaderboard", err);
    res.status(500).json(err.message);
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = (await prisma.leaderboard.findMany({
      orderBy:[
        {
          duration: "asc"
        }
      ]
    }))
    res.json(leaderboard);
  } catch (err) {
    console.error("Error getting leaderboard", err);

    res.status(500).json(err.message);
  }
};
