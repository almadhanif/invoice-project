const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Endpoint untuk mendapatkan saran produk
router.get('/suggestions', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send({ error: 'Query parameter is required' });
  }

  try {
    const products = await Product.getAll();
    const suggestions = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json(suggestions);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch product suggestions' });
  }
});

// Endpoint untuk menambahkan produk baru
router.post('/add', async (req, res) => {
  const { name, picture_url, stock, price } = req.body;

  if (!name || !picture_url || !stock || !price) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    console.log('Creating product with data:', {
      name,
      picture_url,
      stock,
      price,
    });
    const newProduct = await Product.create({
      name,
      picture_url,
      stock,
      price,
    });
    console.log('Product created:', newProduct);
    res.status(201).send(newProduct);
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(500).send({ error: 'Failed to add product' });
  }
});

module.exports = router;
