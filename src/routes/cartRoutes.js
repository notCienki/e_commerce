import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', cartController.addToCart);
router.get('/', cartController.viewCart);
router.post('/remove/:productId', cartController.removeFromCart);
router.post('/update/:productId', cartController.updateQuantity);
router.post('/clear', cartController.clearCart);

export default router;
