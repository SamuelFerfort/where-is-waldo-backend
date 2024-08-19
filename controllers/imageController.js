import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const getImages = async (req, res, next) => {
  try {
    const images = await prisma.image.findMany();
    res.json(images);
  } catch (err) {
    console.error("Error fetching all images:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCharactersForImage = async (req, res) => {
  const id = req.params.id;

  try {
    const game = await prisma.image.findUnique({
      where: { id: id },
      select: {
        id: true,
        url: true,
        title: true,
        characters: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Image not found" });
    }

    const sessionData = {
      imageId: id,
      startTime: Date.now(),
    };

    const token = jwt.sign(sessionData, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ ...game, sessionToken: token });
  } catch (err) {
    console.error("Error fetching game info:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
