const express = require('express');
const router = express.Router();

const { verifyAdmin } = require('../middlewares/authMiddleware');
const testimonialController = require('../controllers/testimonialController');

// @route   GET api/testimonials
// @desc    Get all testimonials
router.get('/', testimonialController.getTestimonials);

// @route   POST api/testimonials/reorder
// @desc    Reorder testimonials (admin only)
router.post('/reorder', verifyAdmin, testimonialController.reorderTestimonials);

// @route   POST api/testimonials
// @desc    Create a new testimonial (admin only)
router.post('/', verifyAdmin, testimonialController.createTestimonial);

// @route   PUT api/testimonials/:id
// @desc    Update a testimonial (admin only)
router.put('/:id', verifyAdmin, testimonialController.updateTestimonial);

// @route   DELETE api/testimonials/:id
// @desc    Delete a testimonial (admin only)
router.delete('/:id', verifyAdmin, testimonialController.deleteTestimonial);

module.exports = router;
