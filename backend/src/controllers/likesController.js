import prisma from '../config/prismaClient.js';

// Add a like to a stream
export const addLike = async (req, res) => {
  try {
    const { stream_id } = req.body;
    const user_id = req.user.userId;

    // Check if the user has already liked the stream
    const existingLike = await prisma.like.findFirst({
      where: { user_id, stream_id },
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this stream.' });
    }

    const newLike = await prisma.like.create({
      data: {
        user_id,
        stream_id,
      },
    });

    return res.status(201).json(newLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error liking the stream.' });
  }
};

// Remove a like from a stream
export const removeLike = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.userId;

    const existingLike = await prisma.like.findFirst({
      where: { like_id: id, user_id },
    });

    if (!existingLike) {
      return res.status(404).json({ message: 'Like not found.' });
    }

    await prisma.like.delete({
      where: { like_id: id },
    });

    return res.status(200).json({ message: 'Like removed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing the like.' });
  }
};

// Fetch likes for a specific stream
export const getLikesByStream = async (req, res) => {
  try {
    const { streamId } = req.params;

    const likes = await prisma.like.findMany({
      where: { stream_id: streamId },
      include: { user: { select: { username: true, profile_picture: true } } }, // Include user details
    });

    return res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching likes for the stream.' });
  }
};
