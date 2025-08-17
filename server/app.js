const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const cors = require('cors');

const product = require('./routes/product')

app.use(cors());
app.use(express.json());
app.use('/', product);
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

const port = 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})