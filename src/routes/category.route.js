
import express from "express";
import categoryController from '../controllers/categoryController'
const router = express.Router();
router.get(
  '/gets',
  categoryController.gets
);
export default router;