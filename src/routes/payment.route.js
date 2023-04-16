import express from "express";
import paymentController from "../controllers/paymentController";

const router = express.Router();

router.post('/create', paymentController.createPayment);
router.get('/gets', paymentController.getsPayment);
router.get('/gets/byuser', paymentController.getPaymentByUser);
router.post('/update', paymentController.updatePayment);

export default router;