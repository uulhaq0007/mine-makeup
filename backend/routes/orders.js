const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, requireRole } = require('../middleware/auth');

router.post('/', protect, async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'items required' });
    }

    const ids = items.map((i) => i.product);
    const products = await Product.find({ _id: { $in: ids } });
    const byId = Object.fromEntries(products.map((p) => [String(p._id), p]));

    const lineItems = [];
    let total = 0;
    for (const it of items) {
      const p = byId[String(it.product)];
      if (!p) return res.status(400).json({ message: `Product missing: ${it.product}` });
      const qty = Math.max(1, Number(it.quantity) || 1);
      if (p.stock < qty) {
        return res.status(400).json({ message: `Not enough stock for ${p.name}` });
      }
      lineItems.push({
        product: p._id,
        seller: p.seller,
        name: p.name,
        image: p.image,
        price: p.price,
        quantity: qty
      });
      total += p.price * qty;
    }

    for (const li of lineItems) {
      await Product.updateOne({ _id: li.product }, { $inc: { stock: -li.quantity } });
    }

    const order = await Order.create({
      buyer: req.user._id,
      items: lineItems,
      total,
      shippingAddress,
      status: 'paid'
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

router.get('/mine', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/seller', protect, requireRole('seller'), async (req, res, next) => {
  try {
    const orders = await Order.find({ 'items.seller': req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
