import upload from "../middleware/upload";
import express from "express";
import productController from '../controllers/productController'
const router = express.Router();
router.post(
  '/create',
  upload("medias").single('media'),
  productController.create
);
router.post(
  '/gets',
  productController.create
);
router.post(
  '/get',
  productController.create
);
export default router;