import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/checkout', isAuthenticated, orderController.showCheckout);
router.post('/checkout', isAuthenticated, orderController.placeOrder);
router.get('/', isAuthenticated, orderController.getUserOrders);

export default router;
