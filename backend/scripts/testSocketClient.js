import { io } from "socket.io-client";

// Connect to your Socket.IO server (make sure the port is correct, you're running on port 3000)
const socket = io("http://localhost:3000");

// When connected, log the socket ID and join a stream
socket.on('connect', () => {
  console.log('Connected to server with ID:', socket.id);
  socket.emit("join_stream", "cm5jnazls0002vln8oxbmf06v"); // stream_id (make sure the ID is valid)
});

// Listen for new messages in the chat
socket.on("new_message", (message) => {
  console.log("New message received:", message);
});

// Send a message after a delay to simulate real-time chat
setTimeout(() => {
  socket.emit("send_message", {
    stream_id: "cm5jnazls0002vln8oxbmf06v", // stream_id to which the message is sent
    user_id: "cm5jn86p10000vln8t53mu5up", // example user ID
    message: "Test message from Socket.IO client Terminal - 2"
  });
}, 2000); // delay to simulate a real-time message after a moment
