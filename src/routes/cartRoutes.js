import express from 'express';
import * as cartController from '../controllers/cartController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', isAuthenticated, cartController.addToCart);
router.get('/', isAuthenticated, cartController.viewCart);
router.post('/remove/:productId', isAuthenticated, cartController.removeFromCart);
router.post('/update/:productId', isAuthenticated, cartController.updateQuantity);
router.post('/clear', isAuthenticated, cartController.clearCart);

export default router;
