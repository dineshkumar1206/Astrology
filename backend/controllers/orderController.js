const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  const { items, total, paymentMethod, customerInfo } = req.body;

  if (!items || !total) {
    return res.status(400).json({ message: 'Items and total are required' });
  }

  try {
    // Validate stock first for all items
    const itemsToProcess = [];
    
    for (const item of items) {
      const baseProductId = parseInt(item.id, 10);
      if (isNaN(baseProductId)) continue;
      
      const product = await Product.findByPk(baseProductId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name}` });
      }
      
      if (product.stock !== null && product.stock !== undefined) {
        const qty = item.quantity || 1;
        if (product.stock < qty) {
          return res.status(400).json({ 
            message: `Insufficient stock for product "${product.name}". Only ${product.stock} left in stock.` 
          });
        }
        itemsToProcess.push({ product, qty });
      }
    }
    
    // Decrement stock for all processed items
    for (const { product, qty } of itemsToProcess) {
      product.stock = Math.max(0, product.stock - qty);
      await product.save();
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      total,
      paymentMethod: paymentMethod || 'QR',
      customerInfo: customerInfo || null,
      status: 'CONFIRMED'
    });

    return res.status(201).json({ order });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    return res.json({ orders });
  } catch (err) {
    console.error('Get my orders error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']]
    });
    return res.json({ orders });
  } catch (err) {
    console.error('Get all orders error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders
};
