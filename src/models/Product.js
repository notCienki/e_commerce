const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    default: "general"
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
