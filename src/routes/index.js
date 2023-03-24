import express from "express";
import productRoute from './product.route';
import authRoute from './auth.route';
const router = express.Router();
router.use('/product', productRoute);
router.use('/', authRoute);
export default router;
