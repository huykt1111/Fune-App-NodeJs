import upload from "../middleware/upload";
import express from "express";
import productController from '../controllers/productController'
const router = express.Router();
router.post(
  '/create',
  upload("medias").single('media'),
  productController.create
);
router.get(
  '/gets',
  productController.gets
);
router.get(
  '/get',
  productController.get
);
router.get(
  '/get/by/id',
  productController.getProductByUser
)
router.get(
  '/get/search',
  productController.getSearchProduct
)
export default router;