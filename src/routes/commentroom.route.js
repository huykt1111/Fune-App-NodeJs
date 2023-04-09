import upload from "../middleware/upload";
import express from "express";
import commentRoomController from '../controllers/commentRoomController'
const router = express.Router();
router.post(
    '/create',
    commentRoomController.create
);
router.get(
    '/gets',
    commentRoomController.gets
);
export default router;