
import express from "express";
import sellerController from '../controllers/sellerController'
const router = express.Router();
router.post(
    '/create/seller', sellerController.createSeller
);
export default router;