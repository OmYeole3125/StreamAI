import prisma from "../config/prismaClient.js";

// Store chat messages to the database
export const saveChatMessage = async (stream_id, user_id, message) => {
  try {
    const newChat = await prisma.chat.create({
      data: {
        stream_id,
        user_id,
        message,
      },
    });
    return newChat;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw new Error("Error saving message");
  }
};
