import 'dotenv/config';

import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import loginRoutes from './routes/login.js';
import uploadRoutes from './routes/upload.js';

import dbConnect from './config/dbConnect.js';

dbConnect();



// server/src/server.ts

const app = express();

// enable CORS for the client dev server (change or add origins as needed)
app.use(  
    cors({
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    })
);

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', postRoutes);
app.use('/auth', loginRoutes);
app.use('/api', uploadRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});