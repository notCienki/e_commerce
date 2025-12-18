import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  details: String,
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  stock: {
    type: Number,
    default: 0
  }
});

productSchema.index({ name: 'text', description: 'text', details: 'text' });

export default mongoose.model('Product', productSchema);
