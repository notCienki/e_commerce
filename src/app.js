require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const connectDB = require("./utils/db");

const app = express();

// Połączenie z MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'tajnyklucz',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 godziny
    }
}));

// Ustawiamy EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serwujemy pliki statyczne
app.use(express.static(path.join(__dirname, "public")));

// Routing
const indexRoutes = require("./routes/indexRoutes");
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use("/", indexRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
