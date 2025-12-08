require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./utils/db");

const app = express();

// Połączenie z MongoDB
connectDB();

// Ustawiamy EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serwujemy pliki statyczne
app.use(express.static(path.join(__dirname, "public")));

// Routing
const indexRoutes = require("./routes/indexRoutes");
app.use("/", indexRoutes);

// Start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
