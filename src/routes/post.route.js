import upload from "../middleware/upload";
import express from "express";
import postController from '../controllers/postController'
const router = express.Router();
router.post(
  '/create',
  upload("medias").array('medias'),
  postController.create
);
router.get(
  '/gets',
  postController.gets
);
router.get(
  '/get',
  postController.get
);
export default router;