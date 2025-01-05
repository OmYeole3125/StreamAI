import prisma from "../config/prismaClient.js";

export const createStream = async (req, res) => {
  try {
    const { title, description, category_id, thumbnail } = req.body;
    const streamer_id = req.user.user_id; // Assuming `req.user` contains authenticated user info

    // Create a new stream
    const stream = await prisma.stream.create({
      data: {
        title,
        description,
        category_id,
        thumbnail: thumbnail || "default_thumbnail_url",
        streamer_id,
      },
    });

    res.status(201).json({ message: "Stream created successfully", stream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create stream" });
  }
};
