import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

export const dashboard = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const openOrders = await Order.countDocuments({ status: 'open' });

    res.render('pages/admin/dashboard', {
      stats: {
        products: productsCount,
        users: usersCount,
        orders: ordersCount,
        openOrders
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera');
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('pages/admin/products', { products, error: null, success: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera');
  }
};

export const showAddProduct = (req, res) => {
  res.render('pages/admin/add-product', { error: null });
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, details, price, stock, images, category } = req.body;

    if (!name || !price) {
      return res.render('pages/admin/add-product', { error: 'Nazwa i cena są wymagane' });
    }

    const imagesArray = images ? images.split('\n').map(img => img.trim()).filter(img => img) : [];

    const product = new Product({
      name,
      description,
      details,
      category: category || 'Other',
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      images: imagesArray
    });

    await product.save();
    res.redirect('/admin/products?success=added');
  } catch (err) {
    console.error(err);
    res.render('pages/admin/add-product', { error: 'Błąd podczas dodawania produktu' });
  }
};

export const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect('/admin/products?error=notfound');
    }
    res.render('pages/admin/edit-product', { product, error: null });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/products?error=servererror');
  }
};

export const editProduct = async (req, res) => {
  try {
    const { name, description, details, price, stock, images, category } = req.body;

    if (!name || !price) {
      const product = await Product.findById(req.params.id);
      return res.render('pages/admin/edit-product', { product, error: 'Nazwa i cena są wymagane' });
    }

    const imagesArray = images ? images.split('\n').map(img => img.trim()).filter(img => img) : [];

    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      details,
      category: category || 'Other',
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      images: imagesArray
    });

    res.redirect('/admin/products?success=updated');
  } catch (err) {
    console.error(err);
    const product = await Product.findById(req.params.id);
    res.render('pages/admin/edit-product', { product, error: 'Błąd podczas aktualizacji' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products?success=deleted');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/products?error=deleteerror');
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render('pages/admin/users', { users, success: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera');
  }
};

export const toggleAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.redirect('/admin/users');
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.redirect('/admin/users?success=updated');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/users');
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username').sort({ createdAt: -1 });
    res.render('pages/admin/orders', { orders, success: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera');
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.redirect('/admin/orders?success=updated');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/orders');
  }
};
