const router = require('express').Router();
const Product = require('../models/Product');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { q, category, seller, min, max, sort } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (seller) filter.seller = seller;
    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }
    const sortMap = {
      'price-asc': { price: 1 },
      'price-desc': { price: -1 },
      'newest': { createdAt: -1 }
    };
    const products = await Product.find(filter)
      .populate('seller', 'name shopName')
      .sort(sortMap[sort] || { createdAt: -1 })
      .limit(100);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/mine', protect, requireRole('seller'), async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name shopName');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, requireRole('seller'), async (req, res, next) => {
  try {
    const { name, brand, category, description, price, stock, image } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ message: 'name and price are required' });
    }
    const product = await Product.create({
      seller: req.user._id,
      name,
      brand,
      category,
      description,
      price,
      stock,
      image
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, requireRole('seller'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (String(product.seller) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not your product' });
    }
    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, requireRole('seller'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (String(product.seller) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not your product' });
    }
    await product.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
