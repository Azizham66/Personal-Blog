import { Router } from "express";
import { upload, uploadController } from "../controllers/uploadcontroller.js";
const router = Router()

router.post('/upload', upload.single('file'), uploadController)

export default router;