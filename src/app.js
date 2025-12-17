import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './utils/db.js';
import { attachUserToViews } from './middleware/auth.js';
import indexRoutes from './routes/indexRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

// Middleware do udostępniania danych usera w widokach
app.use(attachUserToViews);

// Routing
app.use("/", indexRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);

// Start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
