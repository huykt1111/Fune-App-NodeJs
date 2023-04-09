import express from "express";
import productRoute from './product.route';
import postRoute from './post.route';
import postRoomRoute from "./postroom.route";
import authRoute from './auth.route';
import sellerRoute from './seller.route';
import categoryRoute from './category.route';
import roomRoute from './room.route';
import commentroom from './commentroom.route'
const router = express.Router();
router.use('/product', productRoute);
router.use('/post', postRoute);
router.use('/category', categoryRoute);
router.use('/seller', sellerRoute);
router.use('/room', roomRoute);
router.use('/post/room', postRoomRoute);
router.use('/comment/room', commentroom);
router.use('/', authRoute);
export default router;
