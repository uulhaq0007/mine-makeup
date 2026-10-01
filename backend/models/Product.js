const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    category: {
      type: String,
      enum: ['lips', 'eyes', 'face', 'skincare', 'fragrance', 'tools', 'other'],
      default: 'other'
    },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '' },
    rating: { type: Number, default: 0, min: 0, max: 5 }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', brand: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
