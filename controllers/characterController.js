import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const checkCoordinates = async (req, res) => {
    const { x, y, imageId } = req.body;

    try {
        const characters = await prisma.character.findMany({
            where: { imageId }
        });

        const foundCharacters = characters.filter(character => {
            const distance = Math.sqrt(
                Math.pow((x - character.x), 2) + Math.pow((y - character.y), 2)
            );
            return distance <= character.radius;
        });

        if (foundCharacters.length > 0) {
            res.json({
                message: `Found ${foundCharacters.map(c => c.name).join(', ')}!`,
                foundCharacters: foundCharacters.map(c => c.name),
                isFound: true
            });
        } else {
            res.json({ message: "Try Again", isFound: false });
        }

    } catch (err) {
        console.error(`Error checking coordinates:`, err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};