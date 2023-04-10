
import express from "express";
import cartController from '../controllers/cartController'
const router = express.Router();
router.post(
    '/create', cartController.create
);
router.get(
    '/gets', cartController.gets
);
router.post(
    '/increase', cartController.increase
);
router.post(
    '/decrease', cartController.decrease
);
export default router;