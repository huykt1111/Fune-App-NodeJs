import upload from "../middleware/upload";
import express from "express";
import postRoomController from '../controllers/postRoomController'
const router = express.Router();
router.post(
    '/create',
    upload("medias").array('medias'),
    postRoomController.create
);
router.get(
    '/gets',
    postRoomController.gets
);
router.get(
    '/get',
    postRoomController.get
);
export default router;