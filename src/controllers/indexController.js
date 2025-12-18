import Product from '../models/Product.js';

export const home = async (req, res) => {
  try {
    const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
    res.render("pages/home", { latestProducts });
  } catch (err) {
    console.error(err);
    res.render("pages/home", { latestProducts: [] });
  }
};
