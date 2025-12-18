import mongoose from 'mongoose';
import connectDB from './db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const seedProducts = [
  {
    name: "Laptop",
    description: "Macbook Pro",
    category: "Electronics",
    details: `Procesor: Apple M4
              RAM: 16GB
              Dysk SSD: 512GB
              Karta graficzna: Apple M4 (10 rdzeni)
              Ekran: 14.2", 3024 x 1964px, Matryca Liquid Retina XDR, 120Hz
              System operacyjny: macOS`,
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
    category: "Electronics",
    details: `Wyświetlacz: 6.3", 2622 x 1206px, OLED, Super Retina XDR
              Pamięć wbudowana [GB]: 256
              Procesor: Apple A19, Sześciordzeniowy
              Aparat: Tylny 2x48 Mpx, Przedni 18 Mpx
              Standard karty SIM: eSIM, Nano SIM
              Komunikacja: 5G, Wi-Fi, NFC, Bluetooth 6.0, USB typ C
              Wersja systemu: iOS 26
              Smartfon ASIS: Nie`,
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
    category: "Accessories",
    details: `Dedykowane: Do iPod/iPhone/iPad, Do telefonów
              Czas pracy [h]: do 24
              Typ słuchawek: Dokanałowe
              Transmisja bezprzewodowa: Bluetooth
              Aktywna redukcja szumów (ANC): Tak
              Regulacja głośności: Tak
              Kolor: Biały`,
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
  console.log("Produkty dodane!");

  const existingAdmin = await User.findOne({ username: 'admin' });

  if (!existingAdmin) {
    const admin = new User({
      username: 'admin',
      password: 'zaq1@WSX',
      isAdmin: true
    });
    await admin.save();
    console.log("Konto admina utworzone: admin / zaq1@WSX");
  } else {
    console.log("Admin już istnieje, pomijam tworzenie.");
  }

  console.log("\nSeed done!");
  mongoose.connection.close();
};

seedDB();
