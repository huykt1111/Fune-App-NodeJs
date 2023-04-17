import upload from "../middleware/upload";
import express from "express";
import postController from '../controllers/postController'
const router = express.Router();
router.post(
  '/create',
  upload("medias").array('medias'),
  postController.create
);
router.post(
  '/love',
  postController.love
);
router.get(
  '/gets',
  postController.gets
);
router.get(
  '/get',
  postController.get
);
router.get(
  '/comment/gets',
  postController.getCommentsByPostID
)
router.post(
  '/comment/create',
  postController.createComment
)
export default router;