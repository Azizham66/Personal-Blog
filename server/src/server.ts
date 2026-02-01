import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.ts';
import loginRoutes from './routes/login.ts';

import dbConnect from './config/dbConnect.ts';
import dotenv from 'dotenv';

dotenv.config();

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
app.use('/api', postRoutes);
app.use('/auth', loginRoutes)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});