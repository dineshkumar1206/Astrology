const express = require('express');
const router = express.Router();

const { verifyAdmin } = require('../middlewares/authMiddleware');
const { upload, handleUploadError } = require('../middlewares/uploadMiddleware');
const productController = require('../controllers/productController');

// @route   GET api/products
// @desc    Get all products
router.get('/', productController.getProducts);

// @route   POST api/products
// @desc    Create a new product (admin only)
router.post('/', verifyAdmin, upload.single('image'), handleUploadError, productController.createProduct);

// @route   PUT api/products/:id
// @desc    Update a product (admin only)
router.put('/:id', verifyAdmin, upload.single('image'), handleUploadError, productController.updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete a product (admin only)
router.delete('/:id', verifyAdmin, productController.deleteProduct);

module.exports = router;
