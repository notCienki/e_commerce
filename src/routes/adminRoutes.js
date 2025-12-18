import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated, isAdmin);

router.get('/', adminController.dashboard);
router.get('/products', adminController.getProducts);
router.get('/products/add', adminController.showAddProduct);
router.post('/products/add', adminController.addProduct);
router.get('/products/edit/:id', adminController.showEditProduct);
router.post('/products/edit/:id', adminController.editProduct);
router.post('/products/delete/:id', adminController.deleteProduct);
router.get('/users', adminController.getUsers);
router.post('/users/toggle-admin/:id', adminController.toggleAdmin);
router.get('/orders', adminController.getAllOrders);
router.post('/orders/status/:id', adminController.updateOrderStatus);

export default router;
