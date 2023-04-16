import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post('/create', orderController.createOrder);
router.post('/update', orderController.updateOrder);
router.get('/gets', orderController.getsOrder);

export default router;