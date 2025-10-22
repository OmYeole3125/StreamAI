import prisma from "../config/prismaClient.js";

// Create Stream
export const createStream = async (req, res) => {
  try {
    const { title, description, category_id, thumbnail } = req.body;
    const streamer_id = req.user.userId; // Assuming the user's ID is available from the JWT

    const stream = await prisma.stream.create({
      data: {
        title,
        description,
        category_id,
        thumbnail: thumbnail || "placeholder_url",  // Default if no thumbnail
        streamer_id,
        is_live: false,  // Initial state is offline
      },
    });

    res.status(201).json({ message: "Stream created successfully", stream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create stream" });
  }
};

// Get All Streams
export const getAllStreams = async (req, res) => {
  try {
    const streams = await prisma.stream.findMany({
      include: {
        category: true,  // Include category details
        streamer: true,  // Include streamer (user) details
      },
    });
    res.status(200).json({ streams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch streams" });
  }
};

// Get Stream by ID
export const getStreamById = async (req, res) => {
  const { id } = req.params;
  try {
    const stream = await prisma.stream.findUnique({
      where: { stream_id: id },
      include: {
        category: true,  // Include category details
        streamer: true,  // Include streamer (user) details
      },
    });

    if (!stream) {
      return res.status(404).json({ message: "Stream not found" });
    }

    res.status(200).json({ stream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stream" });
  }
};

// Update Stream
export const updateStream = async (req, res) => {
  const { id } = req.params;
  const { title, description, category_id, thumbnail } = req.body;
  try {
    const updatedStream = await prisma.stream.update({
      where: { stream_id: id },
      data: {
        title,
        description,
        category_id,
        thumbnail,
      },
    });

    res.status(200).json({ message: "Stream updated successfully", updatedStream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update stream" });
  }
};

// Delete Stream
export const deleteStream = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.stream.delete({
      where: { stream_id: id },
    });

    res.status(200).json({ message: "Stream deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete stream" });
  }
};

