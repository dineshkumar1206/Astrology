const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const { items, total, paymentMethod, customerInfo } = req.body;

  if (!items || !total) {
    return res.status(400).json({ message: 'Items and total are required' });
  }

  try {
    const order = await Order.create({
      userId: req.user.id,
      items,
      total,
      paymentMethod: paymentMethod || 'QR',
      customerInfo: customerInfo || null,
      status: 'PENDING'
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
