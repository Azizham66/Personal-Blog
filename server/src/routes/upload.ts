import { Router } from "express";
import { upload, uploadController } from "../controllers/uploadcontroller.ts";
const router = Router()

router.post('/upload', upload.single('file'), uploadController)

export default router;