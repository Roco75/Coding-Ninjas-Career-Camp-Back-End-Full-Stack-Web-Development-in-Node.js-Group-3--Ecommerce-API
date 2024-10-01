// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// API to add products
router.post('/create', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = new Product({ name, quantity });
    await product.save();
    res.status(201).json({ data: { product } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to list products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: { products } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to delete product by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ data: { message: "product deleted" } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to update product quantity
router.post('/:id/update_quantity', async (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.query;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.quantity += parseInt(number);
    await product.save();

    res.status(200).json({
      data: {
        product,
        message: 'updated successfully'
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
