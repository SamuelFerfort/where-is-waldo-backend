import { PrismaClient } from "@prisma/client";

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

export const getAllCharactersForImage = async (req, res, next) => {
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
          }
        }}})
    res.json(game)
  } catch (err) {
    console.error("Error fetching all game info:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

