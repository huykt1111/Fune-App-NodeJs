
import express from "express";
import roomController from '../controllers/roomController'
const router = express.Router();
router.post(
    '/create', roomController.createRoom
);
router.get(
    '/get/create', roomController.getRoomCreate
);
router.get(
    '/get/not-joined', roomController.getRoomNotJoined
);
export default router;