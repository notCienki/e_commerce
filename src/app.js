const express = require('express');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello shop!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

