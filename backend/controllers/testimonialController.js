const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [['order', 'ASC'], ['id', 'ASC']]
    });
    res.json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ msg: 'Server error fetching testimonials' });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, role, rating, quote, order } = req.body;
    const newTestimonial = await Testimonial.create({
      name,
      role,
      rating: rating || 5,
      quote,
      order: order || 0
    });
    res.status(201).json(newTestimonial);
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ msg: 'Server error creating testimonial' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { name, role, rating, quote, order } = req.body;
    const testimonial = await Testimonial.findByPk(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }

    testimonial.name = name !== undefined ? name : testimonial.name;
    testimonial.role = role !== undefined ? role : testimonial.role;
    testimonial.rating = rating !== undefined ? rating : testimonial.rating;
    testimonial.quote = quote !== undefined ? quote : testimonial.quote;
    testimonial.order = order !== undefined ? order : testimonial.order;

    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ msg: 'Server error updating testimonial' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }
    
    await testimonial.destroy();
    res.json({ msg: 'Testimonial removed' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ msg: 'Server error deleting testimonial' });
  }
};

exports.reorderTestimonials = async (req, res) => {
  try {
    const { updates } = req.body; 
    // updates = [{ id: 1, order: 0 }, { id: 2, order: 1 }, ...]
    if (!Array.isArray(updates)) {
      return res.status(400).json({ msg: 'Invalid updates format' });
    }
    
    const promises = updates.map(update => 
      Testimonial.update({ order: update.order }, { where: { id: update.id } })
    );
    await Promise.all(promises);
    
    res.json({ msg: 'Reordered successfully' });
  } catch (err) {
    console.error('Error reordering testimonials:', err);
    res.status(500).json({ msg: 'Server error reordering testimonials' });
  }
};
