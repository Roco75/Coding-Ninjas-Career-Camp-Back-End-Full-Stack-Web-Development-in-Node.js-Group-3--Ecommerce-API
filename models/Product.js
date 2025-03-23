const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0,  // Ensures no negative quantity
    default: 0
  }
}, { timestamps: true });  // Adds createdAt & updatedAt fields

module.exports = mongoose.model('Product', productSchema);
