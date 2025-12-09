const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('pages/products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
