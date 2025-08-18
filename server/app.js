const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const cors = require('cors');

// Serve static files from React dist
app.use(express.static(path.join(__dirname, "../client/dist")));

const product = require('./routes/product')

app.use(cors());
app.use(express.json());
app.use('/api/products', product);
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// // Catch-all route for client-side routing
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
