import express from "express";
import productRoute from './product.route';
import authRoute from './auth.route';
import sellerRoute from './seller.route';
import categoryRoute from './category.route'
const router = express.Router();
router.use('/product', productRoute);
router.use('/category', categoryRoute);
router.use('/seller', sellerRoute);
router.use('/', authRoute);
export default router;
