const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  image: String, // ścieżka do pliku w /public/img/
  createdAt: {
    type: Date,
    default: Date.now
  },
  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Product", productSchema);
