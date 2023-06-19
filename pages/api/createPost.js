// This is a dummy route for you to test out the database and
// to see how prisma creates new records in the database.

/*
  Usage:

  1. Use a brower to navigate to http://localhost:3000/api/createPost
  2. Check to see if a new record is created in the database by typing
  `npx prisma studio` in the terminal
*/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const randomId = (len) => Math.random().toString(16).slice(len);

export default async function createPost(req, res) {
  if (req.method === "GET") {
    const count = await prisma.post.count();
    console.log(
      "Before creating the post there were " + count + " posts in the database"
    );

    await prisma.post.create({
      data: {
        slug: "my-unique-slug" + randomId(10),
        title: "hey",
        body: "yo",
      },
    });

    console.log(
      "After creating the post there should be " +
        parseInt(count + 1) +
        " posts in the database"
    );

    res
      .status(200)
      .json({ data: "Yaayyyy there should be a new database record" });
  } else {
    res.status(404).send("Not found");
  }
}
