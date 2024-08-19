import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Delete all characters first to avoid foreign key constraints
    await prisma.character.deleteMany({});
    console.log("All characters deleted");

    // Then delete all images
    await prisma.image.deleteMany({});
    console.log("All images deleted");

    console.log("Database cleared successfully");
  } catch (err) {
    console.error("Error clearing database:", err);
  }
}

async function insertImages() {
  try {
    const result = await prisma.image.createMany({
      data: [
        {
          url: "https://res.cloudinary.com/dy0av590l/image/upload/v1723935068/113_i6xfr9.jpg",
          title: "Universe 113 Infested",
        },
        {
          url: "https://res.cloudinary.com/dy0av590l/image/upload/v1723839489/futurama_n0fdii.jpg",
          title: "Cyberpunk City",
        },
        {
          url: "https://res.cloudinary.com/dy0av590l/image/upload/v1723839492/waldo_srxkbw.jpg",
          title: "Universe 113",
        },
      ],
    });
    console.log(`Created ${result.count} images`);
  } catch (err) {
    console.error("Error inserting images:", err);
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
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723881382/pngwing.com_thtvo5.png",
          x: 23,
          y: 95,
          radius: 2,
        },
        {
          name: "Samus",
          imageId: image.id,
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723881427/pngwing.com_2_mqwygw.png",
          x: 63,
          y: 95,
          radius: 2,
        },
        {
          name: "Stewie",
          imageId: image.id,
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723881451/pngwing.com_3_haccra.png",
          x: 94,
          y: 76,
          radius: 2,
        },
        {
          name: "Aang",
          imageId: image.id,
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723881409/pngwing.com_1_wq5x8a.png",
          x: 6,
          y: 75,
          radius: 2,
        },
      ],
    });
    console.log("Characters created for Cyberpunk City");
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
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723882248/pngwing.com_6_ppl4en.png",
          x: 46,
          y: 32,
          radius: 2,
        },
        {
          name: "Waldo",
          imageId: image.id,
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723882203/pngwing.com_5_rbfw0n.png",
          x: 15,
          y: 63,
          radius: 2,
        },
        {
          name: "Sonic",
          imageId: image.id,
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723882147/pngwing.com_4_b1k9qe.png",
          x: 72,
          y: 67,
          radius: 2,
        },
      ],
    });
    console.log("Characters created for Universe 113");
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
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723935171/pngwing.com_7_umxlxd.png",
          x: 52,
          y: 58,
          radius: 2,
        },
        {
          name: "Saitama",
          imageId: image.id,
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723935219/pngwing.com_8_me5w5u.png",
          x: 34,
          y: 61,
          radius: 2,
        },
        {
          name: "Guts",
          imageId: image.id,
          picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723935288/pngwing.com_9_ckyisy.png",
          x: 49,
          y: 89,
          radius: 2,
        },
      ],
    });
    console.log("Characters created for Universe 113 Infested");
  } catch (err) {
    console.error("Error inserting characters:", err);
  }
}

async function resetAndPopulateDatabase() {
  try {
    await clearDatabase();
    await insertImages();
    await insertCharacters();
    await insertCharacters2ndImage();
    await insertCharacters3rdImage();
    console.log("Database reset and populated successfully");
  } catch (err) {
    console.error("Error in resetAndPopulateDatabase:", err);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
resetAndPopulateDatabase();