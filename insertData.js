import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


async function insertData() {

    try {
        await prisma.image.create({data: {url: "https://res.cloudinary.com/dy0av590l/image/upload/v1723514143/aquatic-aquarium_sefruv.webp", title: "pokemon"}})
    } catch(err) {

        console.error("Error inserting image:", err)
    }

}

async function insertCharacters() {

    const image = await prisma.image.findFirst({where: {title: "pokemon" }})

    try {
        await prisma.character.create({data: {
            name: "girl",
            imageId: image.id,
            picture: "https://res.cloudinary.com/dy0av590l/image/upload/v1723514854/Screenshot_from_2024-08-13_04-07-01_fvodun.png",
            x: 23,
            y: 31
        }})
        console.log("Character created")
    } catch(err) {

        console.error("Error inserting image:", err)
    }

}

const images = await prisma.image.findMany();

console.log(images)