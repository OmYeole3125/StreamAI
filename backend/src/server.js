import express, { json } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import streamkeyRoutes from './routes/streamkeyRoutes.js';
import streamRoutes from './routes/streamRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import likeRoutes from './routes/likesRoutes.js';
import followerRoutes from './routes/followerRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";
import setupSocketIO from "./config/socket.js";
import cors from 'cors';
import http from 'http';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/streamkey', streamkeyRoutes);
app.use('/api/streams', streamRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/followers', followerRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use("/api/chat", chatRoutes);


app.get('/', (req, res)=>{
    res.send("Welcome to StreamAI");
});

// Setup Socket.IO
setupSocketIO(server);

server.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
});