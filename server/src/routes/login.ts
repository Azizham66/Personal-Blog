import { loginController } from "../controllers/loginController.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/authorization.js";
import { userController } from "../controllers/userController.js";

const router = Router()

router.post("/login", loginController)
router.get("/user", authMiddleware, userController)

export default router;