export const addToCart = (req, res) => {
  const { productId, productName, productPrice, productImage, quantity } = req.body;
  const qty = parseInt(quantity) || 1;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    req.session.cart.push({
      productId,
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
      quantity: qty
    });
  }

  if (req.headers['content-type']?.includes('application/json')) {
    res.json({ success: true, cartCount: req.session.cart.reduce((sum, item) => sum + item.quantity, 0) });
  } else {
    res.redirect('/cart');
  }
};

export const viewCart = (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  res.render('pages/cart', { cart, total });
};

export const removeFromCart = (req, res) => {
  const { productId } = req.params;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);
  }

  res.redirect('/cart');
};

export const updateQuantity = (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (req.session.cart) {
    const item = req.session.cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = parseInt(quantity);
      if (item.quantity <= 0) {
        req.session.cart = req.session.cart.filter(i => i.productId !== productId);
      }
    }
  }

  res.json({ success: true });
};

export const clearCart = (req, res) => {
  req.session.cart = [];
  res.redirect('/cart');
};
