import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import noteRoutes from './routes/note.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); 
app.use(cors({ origin: '*' }));

// Routes
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

app.listen(PORT, () => {
    connectDB();  
    console.log('Server is running on http://localhost:' + PORT);
});