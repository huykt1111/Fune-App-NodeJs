
import express from "express";
import upload from "../middleware/upload";
import userController from "../controllers/userController";
const router = express.Router();
router.post('/get-users', userController.handleGetAllUsers);
router.post('/login', userController.handleLogin);
router.post('/register', userController.handleRegister);
router.post(
    '/update/update',
    upload("individuals").single('media'),
    userController.updateUser
);
export default router;