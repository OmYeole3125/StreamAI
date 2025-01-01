import prisma from "../config/prismaClient.js";
import { nanoid } from "nanoid"; // For generating unique stream keys

// Generate stream key for the logged-in user
export const generateStreamKey = async (req, res) => {
  const { userId } = req.user; // Get the userId from the JWT token

  try {
    // Check if the user already has a stream key
    const existingKey = await prisma.streamKey.findUnique({
      where: {
        streamer_id: userId,
      },
    });

    if (existingKey) {
      return res.status(400).json({ message: "Stream key already exists." });
    }

    // Generate a unique stream key using nanoid
    const streamKey = nanoid(20); // Generates a 20-character unique key

    // Save the stream key in the database
    const newStreamKey = await prisma.streamKey.create({
      data: {
        streamer_id: userId,
        stream_key: streamKey,
      },
    });

    return res.status(200).json({ streamKey: newStreamKey.stream_key });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
