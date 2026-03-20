const Product = require('../models/product.model');
const Inventory = require('../models/inventory.model');
const asyncHandler = require('../utils/asyncHandler');

exports.createProduct = asyncHandler(async (req, res) => {
  const { name, sku, price, description } = req.body;

  const product = await Product.create({
    name,
    sku,
    price,
    description
  });

  const inventory = await Inventory.create({
    product: product._id,
    stock: 0,
    reserved: 0,
    soldCount: 0
  });

  res.status(201).json({
    message: 'Tạo product thành công và đã tạo inventory tương ứng.',
    data: {
      product,
      inventory
    }
  });
});

exports.getAllProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });

  res.json({
    message: 'Lấy danh sách product thành công.',
    count: products.length,
    data: products
  });
});
