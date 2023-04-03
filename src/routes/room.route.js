
import express from "express";
import roomController from '../controllers/roomController'
const router = express.Router();
router.post(
    '/create', roomController.createRoom
);
router.post(
    '/join', roomController.joinRoom
);
router.get(
    '/get/create', roomController.getRoomCreate
);
router.get(
    '/get/not-joined', roomController.getRoomNotJoined
);
router.get(
    '/get/joined', roomController.getRoomJoined
);
router.get(
    '/get/members', roomController.getMembers
);
export default router;