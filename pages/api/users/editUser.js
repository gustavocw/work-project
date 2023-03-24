import prisma from "../../../prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." });
  }

  if (req.method === "PUT") {
    try {
      app.put("/publish/:id", async (req, res) => {
        const { id } = req.params;
        const user = await prisma.user.update({
          where: { id: Number(id) },
          data: { published: true },
        });
      });

      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" });
    }
  }
}
