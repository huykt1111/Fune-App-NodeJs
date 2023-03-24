
import express from "express";
import userController from "../controllers/userController";
const router = express.Router();
router.post('/login', userController.handleLogin);
router.post('/register', userController.handleRegister);
export default router;