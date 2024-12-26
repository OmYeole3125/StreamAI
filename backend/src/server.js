import express, { json } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res)=>{
    res.send("Welcome to StreamAI");
});

app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
});