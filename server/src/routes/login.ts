import { loginController } from "../controllers/loginController.ts";
import { Router } from "express";
import { authMiddleware } from "../middleware/authorization.ts";
import { userController } from "../controllers/userController.ts";

const router = Router()

router.post("/login", loginController)
router.get("/user", authMiddleware, userController)

export default router;