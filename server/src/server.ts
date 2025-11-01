import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

// server/src/server.ts

const app = express();

// enable CORS for the client dev server (change or add origins as needed)
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    })
);

app.use(express.json());

app.delete('/posts/:id', (req: Request, res: Response) => {
    setTimeout(() => {
        console.log('deleted post');
        res.status(200).json({ message: 'deleted post' });
    }, 5000)
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});