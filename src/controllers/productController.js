import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || '';
    const sort = req.query.sort || 'newest';
    const limit = 5;
    const skip = (page - 1) * limit;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    let sortOption = {};
    switch (sort) {
      case 'price-asc':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      case 'name-asc':
        sortOption = { name: 1 };
        break;
      case 'newest':
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(filter).sort(sortOption).skip(skip).limit(limit);

    res.render('pages/products', {
      products,
      searchQuery: '',
      currentPage: page,
      totalPages,
      selectedCategory: category,
      selectedSort: sort
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const searchProducts = async (req, res) => {
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
      totalPages,
      selectedCategory: '',
      selectedSort: 'newest'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('pages/product-detail', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
