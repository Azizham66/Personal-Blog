import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
    res.status(200).json({ 
        message: {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage()
        }
    });
});

export default router;