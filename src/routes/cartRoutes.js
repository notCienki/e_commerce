const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.get('/', cartController.viewCart);
router.post('/remove/:productId', cartController.removeFromCart);
router.post('/update/:productId', cartController.updateQuantity);
router.post('/clear', cartController.clearCart);

module.exports = router;
