import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertData() {
  try {
    await prisma.image.create({
      data: {
        url: "https://res.cloudinary.com/dy0av590l/image/upload/v1723935068/113_i6xfr9.jpg",
        title: "Universe 113 Infested",
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

async function insertCharacters2ndImage() {
  const image = await prisma.image.findFirst({
    where: { title: "Universe 113" },
  });

  try {
    await prisma.character.createMany({
      data: [
        {
          name: "Kratos",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723882248/pngwing.com_6_ppl4en.png",
          x: 46,
          y: 32,
          radius: 1,
        },
        {
          name: "Waldo",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723882203/pngwing.com_5_rbfw0n.png",
          x: 15,
          y: 63,
          radius: 1,
        },
        {
          name: "Sonic",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723882147/pngwing.com_4_b1k9qe.png",
          x: 72,
          y: 67,
          radius: 1,
        },
      ],
    });
    console.log("Character created");
  } catch (err) {
    console.error("Error inserting characters:", err);
  }
}

async function insertCharacters3rdImage() {
  const image = await prisma.image.findFirst({
    where: { title: "Universe 113 Infested" },
  });

  try {
    await prisma.character.createMany({
      data: [
        {
          name: "Crash",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723935171/pngwing.com_7_umxlxd.png",
          x: 52,
          y: 58,
          radius: 2,
        },
        {
          name: "Saitama",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723935219/pngwing.com_8_me5w5u.png",
          x: 34,
          y: 61,
          radius: 3,
        },
        {
          name: "Guts",
          imageId: image.id,
          picture:
            "https://res.cloudinary.com/dy0av590l/image/upload/v1723935288/pngwing.com_9_ckyisy.png",
          x: 49,
          y: 89,
          radius: 3,
        },
      ],
    });
    console.log("Character created");
  } catch (err) {
    console.error("Error inserting characters:", err);
  }
}

async function updateCharacterUrls() {
  const image = await prisma.image.findFirst({
    where: { title: "Universe 113" },
  });

  const charactersData = [
    {
      name: "Sonic",
      imageId: image.id,
      picture:
        "https://res.cloudinary.com/dy0av590l/image/upload/v1723882147/pngwing.com_4_b1k9qe.png",
      x: 72,
      y: 67,
      radius: 1,
    },
  ];

  try {
    for (const character of charactersData) {
      await prisma.character.updateMany({
        where: {
          name: character.name,
          imageId: image.id,
        },
        data: {
          picture: character.picture,
        },
      });
      console.log(`Updated URL for ${character.name}`);
    }
    console.log("All character URLs updated successfully");
  } catch (err) {
    console.error("Error updating character URLs:", err);
  }
}

async function deletePokemonImageData() {
  try {
    // Find the image with title "pokemon"
    const pokemonImage = await prisma.image.findFirst({
      where: { title: "pokemon" },
      include: { characters: true, leaderboard: true },
    });

    if (!pokemonImage) {
      console.log('No image with title "pokemon" found');
      return;
    }

    // Delete associated characters
    await prisma.character.deleteMany({
      where: { imageId: pokemonImage.id },
    });

    // Delete associated leaderboard entries
    await prisma.leaderboard.deleteMany({
      where: { imageId: pokemonImage.id },
    });

    // Finally, delete the image itself
    await prisma.image.delete({
      where: { id: pokemonImage.id },
    });

    console.log('Successfully deleted all data related to the "pokemon" image');
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertCharacters3rdImage();
