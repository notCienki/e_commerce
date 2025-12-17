import Order from '../models/Order.js';

export const showCheckout = (req, res) => {
  const cart = req.session.cart || [];

  if (cart.length === 0) {
    return res.redirect('/cart');
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  res.render('pages/checkout', { cart, total });
};

export const placeOrder = async (req, res) => {
  try {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect('/cart');
    }

    const { fullName, email, phone, address } = req.body;

    if (!fullName || !email || !phone || !address) {
      return res.redirect('/checkout');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = new Order({
      user: req.session.userId,
      products: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      customerInfo: {
        fullName,
        email,
        phone,
        address
      },
      totalPrice: total,
      status: 'open'
    });

    await order.save();

    req.session.cart = [];

    res.render('pages/order-success', {
      orderId: order._id,
      products: order.products,
      totalPrice: order.totalPrice
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd podczas składania zamówienia');
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.render('pages/orders', { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd podczas pobierania zamówień');
  }
};
