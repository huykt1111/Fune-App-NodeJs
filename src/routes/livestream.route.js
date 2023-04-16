import upload from "../middleware/upload";
import express from "express";
import livestreamController from '../controllers/livestreamController'
const router = express.Router();
router.post(
    '/create',
    upload("medias").single('media'),
    livestreamController.create
);
router.get(
    '/gets',
    livestreamController.gets
);
export default router;