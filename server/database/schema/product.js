const mongoose = require('../connection');

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discount: { type: Number },
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  url: { type: String },
})

const Product = mongoose.model('Products', productSchema);

module.exports = Product;