const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyAdmin, verifyAnyUser } = require('../middlewares/authMiddleware');

router.post('/', verifyAnyUser, orderController.createOrder);
router.get('/my-orders', verifyAnyUser, orderController.getMyOrders);
router.get('/', verifyAdmin, orderController.getAllOrders);

module.exports = router;
