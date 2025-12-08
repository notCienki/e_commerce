const mongoose = require("mongoose");
const connectDB = require("./db");
const Product = require("../models/Product");

const seedProducts = [
  { name: "Laptop", description: "Macbook Pro", price: 7999, stock: 5 },
  { name: "Smartfon", description: "Iphone 17", price: 3999, stock: 10 },
  { name: "Słuchawki", description: "AirPods Pro", price: 1099, stock: 15 }
];

const seedDB = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
  console.log("Seed done!");
  mongoose.connection.close();
};

seedDB();
