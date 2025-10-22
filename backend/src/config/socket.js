import { Server } from "socket.io";
import prisma from "./prismaClient.js";  // Import Prisma client

const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // You can modify this if you want to restrict allowed origins
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a specific stream's chat room
    socket.on("join_stream", (stream_id) => {
      console.log(`User ${socket.id} joined stream ${stream_id}`);
      socket.join(stream_id);  // Room is created for each stream_id
    });

    // Send a message to the stream's chat room
    socket.on("send_message", async ({ stream_id, user_id, message }) => {
      const chatMessage = {
        stream_id,
        user_id,
        message,
        sent_at: new Date(),
      };

      // Save the chat message to the database
      try {
        const savedMessage = await saveMessageToDB(chatMessage);
        console.log("Message saved:", savedMessage);

        // Broadcast the message to everyone in the chat room
        io.to(stream_id).emit("new_message", savedMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

// Function to save messages to the database
const saveMessageToDB = async (messageData) => {
  try {
    console.log("Saving message to DB:", messageData); // Debugging log
    const savedMessage = await prisma.chat.create({
      data: messageData,
    });
    return savedMessage;
  } catch (error) {
    console.error("Error saving message:", error);
  }
};

export default setupSocketIO;
