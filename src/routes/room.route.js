
import express from "express";
import roomController from '../controllers/roomController'
const router = express.Router();
router.post(
    '/create', roomController.createRoom
);
export default router;