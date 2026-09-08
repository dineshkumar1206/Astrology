const Category = require('../models/Category');

const formatCategory = (category, req) => {
  if (!category) return null;
  const cat = category.toJSON ? category.toJSON() : category;
  if (cat.image && cat.image.startsWith('/uploads/')) {
    if (req) {
      const host = `${req.protocol}://${req.get('host')}`;
      const base = req.baseUrl ? req.baseUrl.replace(/\/api\/categories.*/, '') : '';
      cat.image = `${host}${base}${cat.image}`;
    }
  }
  return cat;
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['order', 'ASC'], ['id', 'ASC']] });
    const formatted = categories.map(c => formatCategory(c, req));
    res.json(formatted);
  } catch (err) {
    console.error('Failed to get categories:', err);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, type, desc, slug } = req.body;
    if (!name || !type) {
      return res.status(400).json({ message: 'Category name and type are required' });
    }

    const calculatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    let imageUrl = null;

    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
    }

    const category = await Category.create({
      name,
      type,
      desc,
      image: imageUrl,
      slug: calculatedSlug
    });

    res.status(201).json(formatCategory(category, req));
  } catch (err) {
    console.error('Failed to create category:', err);
    res.status(500).json({ message: 'Server error creating category' });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name, type, desc, slug } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name !== undefined ? name : category.name;
    category.type = type !== undefined ? type : category.type;
    category.desc = desc !== undefined ? desc : category.desc;
    if (name && !slug) {
      category.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    } else if (slug !== undefined) {
      category.slug = slug;
    }

    if (req.file) {
      category.image = '/uploads/' + req.file.filename;
    }

    await category.save();
    res.json(formatCategory(category, req));
  } catch (err) {
    console.error('Failed to update category:', err);
    res.status(500).json({ message: 'Server error updating category' });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Failed to delete category:', err);
    res.status(500).json({ message: 'Server error deleting category' });
  }
};

// Reorder categories
exports.reorderCategories = async (req, res) => {
  try {
    const { updates } = req.body; // Expects: { updates: [{ id: 1, order: 0 }, { id: 2, order: 1 }] }
    
    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ message: 'Invalid updates payload' });
    }

    // Process all updates in parallel
    await Promise.all(
      updates.map(update => 
        Category.update(
          { order: update.order },
          { where: { id: update.id } }
        )
      )
    );

    res.json({ message: 'Categories reordered successfully' });
  } catch (err) {
    console.error('Failed to reorder categories:', err);
    res.status(500).json({ message: 'Server error reordering categories' });
  }
};
