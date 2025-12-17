import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  customerInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "open" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
