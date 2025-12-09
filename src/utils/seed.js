const mongoose = require("mongoose");
const connectDB = require("./db");
const Product = require("../models/Product");

const seedProducts = [
  {
    name: "Laptop",
    description: "Macbook Pro",
    price: 7999,
    stock: 5,
    images: [
      "/img/products/macBookPro/mbp-14-spaceblack-gallery-1-202510.jpeg",
      "/img/products/macBookPro/mbp-14-spaceblack-gallery-2-202510_GEO_PL.jpeg",
      "/img/products/macBookPro/mbp-14-spaceblack-gallery-3-202510.jpeg",
      "/img/products/macBookPro/mbp-14-spaceblack-gallery-4-202510.jpeg",
      "/img/products/macBookPro/mbp-14-spaceblack-gallery-5-202510.jpeg",
      "/img/products/macBookPro/mbp-14-spaceblack-gallery-6-202510.jpeg"
    ]
  },
  {
    name: "Smartfon",
    description: "Iphone 17",
    price: 3999,
    stock: 10,
    images: [
      "/img/products/iphone17/iphone-17-finish-select-202509-black_AV1.webp",
      "/img/products/iphone17/iphone-17-finish-select-202509-black_AV2.webp",
      "/img/products/iphone17/iphone-17-finish-select-202509-black_GEO_EMEA.webp"
    ]
  },
  {
    name: "Słuchawki",
    description: "AirPods Pro",
    price: 1099,
    stock: 15,
    images: [
      "/img/products/airPodsPro/airpods-pro-3-hero-select-202509.jpeg",
      "/img/products/airPodsPro/noise_control_low_noise_mic__kb6kvtgc5aa2_large_2x.jpg"
    ]
  }
];

const seedDB = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
  console.log("Seed done!");
  mongoose.connection.close();
};

seedDB();
