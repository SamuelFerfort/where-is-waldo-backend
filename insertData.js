import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertData() {
  try {
    await prisma.image.create({
      data: {
        url: "https://res.cloudinary.com/dy0av590l/image/upload/v1723839489/futurama_n0fdii.jpg",
        title: "Cyberpunk City",
      },
    });
  } catch (err) {
    console.error("Error inserting image:", err);
  }
}

async function insertCharacters() {
  const image = await prisma.image.findFirst({
    where: { title: "Cyberpunk City" },
  });

  try {
    await prisma.character.createMany({
      data: [
        {
          name: "Link",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723875113/zelda_eyk0lj.png",
          x: 23,
          y: 95,
          radius: 2,
        },
        {
          name: "Samus",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723875164/samus_it9l64.png",
          x: 63,
          y: 95,
          radius: 3,
        },
        {
          name: "Stewie",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723874932/stewie_vwdo6z.png",
          x: 94,
          y: 76,
          radius: 2,
        },
        {
            name: "Aang",
            imageId: image.id,
            picture:
              "https://res.cloudinary.com/dy0av590l/image/upload/v1723875351/aang_dcc2tj.png",
            x: 6,
            y: 75,
            radius: 2,
          },
        
      ],
    });
    console.log("Character created");
  } catch (err) {
    console.error("Error inserting characters:", err);
  }
}

insertCharacters()
