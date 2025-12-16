const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find().skip(skip).limit(limit);

    res.render('pages/products', {
      products,
      searchQuery: '',
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q || '';

    if (!query.trim()) {
      return res.redirect('/products');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const searchFilter = { $text: { $search: query } };
    const totalProducts = await Product.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(searchFilter).skip(skip).limit(limit);

    res.render('pages/products', {
      products,
      searchQuery: query,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
