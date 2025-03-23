const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
const Joi = require('joi');

// Validation Schema
const productSchema = Joi.object({
  name: Joi.string().min(2).required(),
  quantity: Joi.number().integer().min(0).required()
});

// API to add a new product
router.post('/create', async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, quantity } = req.body;
    const product = new Product({ name, quantity });
    await product.save();

    res.status(201).json({ data: { product } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: { products } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ data: { message: "Product deleted successfully" } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to update product quantity (using PUT instead of POST)
router.put('/:id/update_quantity', async (req, res) => {
  try {
    const { id } = req.params;
    const number = parseInt(req.query.number);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    
    if (isNaN(number)) {
      return res.status(400).json({ error: "Invalid quantity value" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.quantity += number;
    await product.save();

    res.status(200).json({
      data: { product, message: 'Quantity updated successfully' }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
