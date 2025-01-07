import express, { json } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import streamkeyRoutes from './routes/streamkeyRoutes.js';
import streamRoutes from './routes/streamRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import likeRoutes from './routes/likesRoutes.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/streamkey', streamkeyRoutes);
app.use('/api/streams', streamRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/likes', likeRoutes);


app.get('/', (req, res)=>{
    res.send("Welcome to StreamAI");
});

app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
});