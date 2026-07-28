const express = require('express');
const router = express.Router();

const { verifyAdmin } = require('../middlewares/authMiddleware');
const { upload, handleUploadError } = require('../middlewares/uploadMiddleware');
const categoryController = require('../controllers/categoryController');

// @route   GET api/categories
// @desc    Get all categories
router.get('/', categoryController.getCategories);

// @route   POST api/categories
// @desc    Create a new category (admin only)
router.post('/', verifyAdmin, upload.single('image'), handleUploadError, categoryController.createCategory);

// @route   PUT api/categories/:id
// @desc    Update a category (admin only)
router.put('/:id', verifyAdmin, upload.single('image'), handleUploadError, categoryController.updateCategory);

// @route   DELETE api/categories/:id
// @desc    Delete a category (admin only)
router.delete('/:id', verifyAdmin, categoryController.deleteCategory);

module.exports = router;
