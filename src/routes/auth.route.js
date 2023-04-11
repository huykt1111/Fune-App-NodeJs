
import express from "express";
import upload from "../middleware/upload";
import userController from "../controllers/userController";
const router = express.Router();
router.post('/get-users', userController.handleGetAllUsers);
router.post('/login', userController.handleLogin);
router.post('/register', userController.handleRegister);
router.post('/address/create', userController.createAddress);
router.get('/address/gets', userController.getsAddress);
router.get('/address/gets/byuser', userController.getsAddressByUser);
router.post('/address/update', userController.updateAddress);
router.post(
    '/update/infor',
    upload("individuals").fields([{ name: 'media', maxCount: 1 }, { name: 'imageIndi', maxCount: 1 }]),
    userController.updateUser
);
export default router;