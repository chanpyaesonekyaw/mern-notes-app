import express from 'express';
import cors from "cors";
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); 

app.use(
    cors({
        origin: "*",
    })
);

app.listen(PORT, () => {
    connectDB();  
    console.log('Server is running on http://localhost:' + PORT);
});

